import React from 'react';
import { StyleSheet, Text, View, Button, ListView, TouchableHighlight, Alert } from 'react-native';
import AsyncStorageHelper from "../Helper/AsynStorageHelper";
import {OrderService} from "../Service/OrderService";
import {LoginService} from "../Service/LoginService";
import SyncHelper from "../Helper/SyncHelper";
import {NotificationService} from "../Service/NotificationService";
import {
    Notifications,
} from 'expo';
var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => {return r1._id !== r2._id;}});
export default class Main extends React.Component{
    constructor(props) {
        super(props);
        this.storageHelper = new AsyncStorageHelper();
        this.orderService = OrderService.getInstance();
        this.orders = [];
        this.loginService = new LoginService();
        this.syncHelper = SyncHelper.getInstance(this.refresh);
        this.notificationService = new NotificationService();
        this.notificationService.registerForPushNotificationsAsync().then().catch();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        this.syncHelper.checkConnection().then(res=>{
            if(res){
                this.syncHelper.new_web_socket();
                this.syncHelper.setRefresh(this.refresh.bind(this));
            }
        }).catch();
        this.setOrders();
        this.state = {
            dataSource: dataSource.cloneWithRows(this.orders)
        }
    }
    _handleNotification = (notification) => {
        this.setState({notification: notification});
    };
    refresh() {
        this.orders = global.dataArray;
        this.setState(prevState => {
            return Object.assign({}, prevState, {dataSource: dataSource.cloneWithRows(this.orders)})
        });
    }

    setOrders(){
        this.orderService.getAllOrders()
            .then(() =>{
                this.orders = global.dataArray;
                this.refresh();
                this.storageHelper.updateStorage().then().catch();
            })
            .catch(err =>{
                console.log("Server Error:" + err);
            });
    }

    charts(){
        this.props.navigation.navigate("Charts",this.orders);
    }

    add(){
        this.props.navigation.navigate("Profile",{order:{},refresh:this.refresh.bind(this)});
    }

    edit(order){
        this.props.navigation.navigate("Profile",{order:order,refresh:this.refresh.bind(this)});
    }

    delete(id){
        this.orderService.deleteOrder(id).then(()=>this.refresh()).catch();

    }

    deleteAlert(id){
        Alert.alert(
            'Are you sure you want to delete this item?',
            '',
            [
                {text: 'No', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => this.delete(id)},
            ],
            { cancelable: true }
        );
    }

    logout(){
        this.loginService.logout();
        this.props.navigation.navigate("Login",{});
    }

    renderRow(order) {
        return (
            <TouchableHighlight onPress={()=>this.edit(order)} key={(order._id)}>
                <View  style={{flexDirection: 'row',alignItems: 'flex-end'}}>
                        <Text style={(styles.item)}>{order.food}</Text>
                        <Text style={(styles.item)}>{order.price}</Text>
                        <Button style={(styles.button)} title="Delete"  onPress={()=>this.deleteAlert(order._id)} />
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View>
                <View  style={{flexDirection: 'row',alignItems: 'flex-end'}}>
                    <Button
                        title="Add"
                        style={(styles.item)}
                        onPress={()=>this.add()}/>
                    <Button
                        title="See Charts"
                        style={(styles.item)}
                        onPress={()=>this.charts()}
                    />
                    <Button
                        title="Logout"
                        style={(styles.item)}
                        onPress={()=>this.logout()}
                    />
                </View>
                <Text>Orders</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow = {this.renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    separator: {
        flex: 1,
        backgroundColor: '#8E8E8E',
    },
    button:{
        justifyContent: 'flex-end'
    }
});
