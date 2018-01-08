/**
 * Created by Titus on 1/3/2018.
 */
import {NetInfo} from "react-native";
import {OrderService} from "../Service/OrderService";
import AsyncStorageHelper from "./AsynStorageHelper";
export default class SyncHelper{
    updateServerPath ='http://192.168.0.107:8001';
    static instance = null;
    lastTime = false;
    refresh = function(){};

    setRefresh(refresh){
        this.refresh = refresh;
    }

    constructor(refresh){
        this.refresh = refresh;
        this.storageHelper = new AsyncStorageHelper();
    }

    static getInstance(refresh){
        if(this.instance === null){
            this.instance = new SyncHelper(refresh);
        }
        return this.instance;
    }

    new_web_socket(){
        let ws = new WebSocket(this.updateServerPath);

        ws.onopen = () => {
            console.log("Connection Opened to server");
        };
        ws.onmessage = (e) => {
            let payload = JSON.parse(e.data);
            if(payload.operation === "CREATED"){
                global.handleCreate(payload.order);
            }
            if(payload.operation === "DELETED"){
                global.handleDelete(payload.order);
            }
            if(payload.operation === "UPDATED"){
                global.handleEdit(payload.order);
            }
            this.storageHelper.updateStorage().then().catch();
            this.refresh();
        };
        this.ws = ws;
    }

    handleFirstConnectivityChange(isConnected) {
        console.log('Client changed:is now ' + (isConnected ? 'online' : 'offline'));
        if(this.lastTime != isConnected){
            this.lastTime = isConnected;
            if(isConnected){
                this.new_web_socket();
                OrderService.getInstance().mergeOrders().then(()=>{
                    OrderService.getInstance().getAllOrders().then(()=>this.refresh()).catch();
                    this.storageHelper.removeChangesList().then(()=>{}).catch();
                }).catch(err=>{});

            }
            else{}
        }
    }

    checkConnection(){
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange.bind(this)
        );
        return NetInfo.isConnected
            .fetch()
            .then(isConnected => {
                console.log('Client  is ' + (isConnected ? 'online' : 'offline'));
                return isConnected;
                //return false;
            }).catch(err=>{console.log("Net Info error:"+err)});

    }
}