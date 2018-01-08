import React from 'react';
import {
    View,
    TextInput,
    Button,
    Picker,
    Text
} from 'react-native';
import Communications from 'react-native-communications';
import AsyncStorageHelper from "../Helper/AsynStorageHelper";
import {OrderService} from "../Service/OrderService";
export default class AddOrder extends React.Component {
    constructor(props) {
        super(props);
        this.storageHelper = new AsyncStorageHelper();
        this.orderService = OrderService.getInstance();
        this.state = {
            _id: 0
            , food: ""
            , price: ""
            , orderType: "here"
        };

        if (this.props.navigation.state.params.order._id !== undefined) {
            var order = this.props.navigation.state.params.order;
            this.state.food = order.food;
            this.state.price = order.price;
            this.state._id = order._id;
            this.state.orderType = order.orderType[0];
        }
    }

    save(){
        if(this.state._id === 0) {
            let order = {
                _id: 0
                , food: this.state.food
                , price: Number(this.state.price)
                , orderType: this.state.orderType
            };
            if(order._id === 0) {
                let i = 0;
                while (global.dataArray.find((el) => el._id === i) || i === 0) {
                    i = i + 1;
                }
                order._id = i;
            }
            this.orderService.addOrder(order)
                .then(() => {
                        this.props.navigation.state.params.refresh();
                })
                .catch((error) => console.log("Error:"+error));

            //Communications.email("titus.bocioc@gmail.com", ["titus.bocioc@gmail.com"], null, "foodApp mail", JSON.stringify(order));
        }
        else{
            let order = {
                _id: this.state._id
                , food: this.state.food
                , price: Number(this.state.price)
                , orderType: this.state.orderType
            };
            this.orderService.updateOrder(order)
                .then(() => {
                    this.props.navigation.state.params.refresh();
                })
                .catch((error) => console.log("Error"));
        }
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(food) => this.setState({food})}
                    value={this.state.food}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    keyboardType='numeric'
                    onChangeText={(price) => this.setState({price})}
                    value={this.state.price.toString()}
                />
                <Text>Order type:</Text>
                <Picker
                    selectedValue={this.state.orderType}
                    onValueChange={(itemValue, itemIndex) => this.setState({orderType: itemValue})}>
                    <Picker.Item label="Here" value="here" />
                    <Picker.Item label="To go" value="togo" />
                </Picker>
                <Button
                    title="save"
                    onPress={() => this.save()}/>
            </View>
        );
    }
}
