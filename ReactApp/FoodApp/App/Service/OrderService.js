/**
 * Created by Titus on 12/28/2017.
 */
import AsyncStorageHelper from "../Helper/AsynStorageHelper";
import SyncHelper from "../Helper/SyncHelper";

export class OrderService{
    static instance = null;
    constructor() {
        this.ordersURL = 'http://192.168.0.107:3000/orders';
        this.orderURL = 'http://192.168.0.107:3000/order';
        this.mergeURL = 'http://192.168.0.107:3000/orders/merge';
        this.storageHelper = new AsyncStorageHelper();
        this.syncHelper = SyncHelper.getInstance();
        this.headers = {
        };
    }

    setHeaders(token){
        this.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'JWT ' + token
        };
    }

    static init(){
        this.instance = new OrderService();
    }

    static getInstance():OrderService {
        if(this.instance === null){
           this.init();
        }
        return this.instance;
    }

    addOrder(order: Order){
        console.log("addOrder");
        return this.syncHelper.checkConnection()
            .then(res=>{
                console.log("addOrder Online:");
                if(res){
                    data = {
                        food: order.food,
                        price: order.price,
                        orderType: order.orderType
                    };
                    const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
                    return fetch(
                        this.ordersURL,
                        {
                            method: 'POST',
                            headers: this.headers,
                            body: formBody
                        }
                    );
                }
                else{
                    console.log("addOrder offline");
                    global.modifiedOffline.push({
                        state:'CREATED',
                        order: {
                            food: order.food,
                            price: order.price,
                            orderType: order.orderType
                        }
                    });
                    this.storageHelper.storeChanges().then().catch();
                    global.handleCreate(order);
                    return this.storageHelper.addItem(order);
                }
            })
            .catch();

    }

    encode(obj){
        return Object.keys(obj).map(key => encodeURIComponent(JSON.stringify(key)) + '=' + encodeURIComponent(JSON.stringify(obj[key]))).join('&');
    }

    mergeOrders(){
        console.log("Merge Orders called");
        data = {};
        data['array'] = [];
        global.modifiedOffline.forEach((elem)=>{
            data["array"].push(elem);
        });
        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(data[key]))).join('&');
        return fetch(
            this.mergeURL,
            {
                method: 'POST',
                headers: this.headers,
                body: formBody
            }
        )
            .then(res=>res.json())
            .then(res=>global.dataArray = res)
            .catch(err=>{alert(err)});
    }

    getAllOrders(){
        console.log("GetAllOrders");
        return this.syncHelper.checkConnection().then(res=>{
            if(!res){
                console.log("Offline Mode");
                return this.storageHelper.initArray();
            }
            else{
                console.log("Online Mode");
                return fetch(
                    this.ordersURL,
                    {
                        method: 'GET',
                        headers: this.headers
                    }
                ).then(res =>res.json())
                    .then(res => global.dataArray = res)
                    .catch(err=>alert(err));
            }
        }).catch(err=>{});
    }

    deleteOrder(orderId){
        this.storageHelper.delItem(orderId).then();
        let deleteURL = this.orderURL + "/" + orderId;
        return this.syncHelper.checkConnection()
            .then(res=>{
                if(res){
                    return fetch(
                        deleteURL,
                        {
                            method: 'DELETE',
                            headers: this.headers,
                        }
                    ).then((response) => response.json())
                        .then((data) => {
                            if(data.message){
                                console.log(data.message);
                            }
                            else{
                                console.log(data.token);
                            }
                        })
                        .catch((error) => console.log("Error"));
                }
                else{
                    global.modifiedOffline.push(
                        {
                            state:'DELETED',
                            _id:orderId
                        }
                    );
                    global.handleDelete(orderId);
                    this.storageHelper.storeChanges().then().catch();
                    return this.storageHelper.delItem(orderId);
                }

            })
            .catch();

    }

    updateOrder(order: Order): Promise{
        return this.syncHelper.checkConnection()
            .then(res=> {
                if (res) {
                    let updateURL = this.orderURL + "/" + order._id;
                    data = {
                        _id: order._id,
                        food: order.food,
                        price: order.price,
                        orderType: order.orderType
                    };
                    const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
                    return fetch(
                        updateURL,
                        {
                            method: 'PUT',
                            headers: this.headers,
                            body: formBody
                        }
                    );
                }
                else{
                    global.modifiedOffline.push({
                        state:'UPDATED',
                        order: order
                    });
                    global.handleEdit(order);
                    this.storageHelper.storeChanges().then().catch();
                    return this.storageHelper.addItem(order);
                }
            }).catch();
    }

    async getOrder(orderId):Promise<Order>{
        let getURL = this.orderURL + "/" + orderId;
        try {
            let res = await fetch(
                getURL,
                {
                    method: 'GET',
                    headers: this.headers
                }
            );
            return res.json()
        }catch(error){
            console.log(error);
        }
    }
}