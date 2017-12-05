import React from 'react';
import {
    View,
    TextInput,
    Button,
    Picker,
    Text
} from 'react-native';
import Communications from 'react-native-communications';
import AsyncStorageHelper from "./Helper/AsynStorageHelper";
export default class AddOrder extends React.Component {
    constructor(props) {
        super(props);
        this.storageHelper = new AsyncStorageHelper();
        this.state = {
            id: 0
            , Food: ""
            , Price: ""
            , orderType: "here"
        };
        if (this.props.navigation.state.params.order.id !== undefined) {
            var order = this.props.navigation.state.params.order;
            this.state.Food = order.Food;
            this.state.Price = order.Price;
            this.state.id = order.id;
            this.state.orderType = order.orderType;
        }
    }

    save() {
        if (this.state.id === 0) {
            var order = {
                id: 0
                , Food: this.state.Food
                , Price: Number(this.state.Price)
                , orderType: this.state.orderType
            };
            var id=1;

            while(this.storageHelper.getIds().find((el)=>el === id) !== undefined){
                id = id + 1;
                console.log(id);
            }
            order.id = id;
            global.dataArray.push(order);

            //Communications.email("titus.bocioc@gmail.com", ["titus.bocioc@gmail.com"], null, "FoodApp mail", JSON.stringify(order));
        }
        else {
            order = this.state;
            for (var i = 0; i < global.dataArray.length; i++) {
                if (global.dataArray[i].id === order.id) {
                    global.dataArray[i] = order;
                }
            }
        }
        this.storageHelper.addItem(order).then(()=>{},()=>{});
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();

    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(Food) => this.setState({Food})}
                    value={this.state.Food}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    keyboardType='numeric'
                    onChangeText={(Price) => this.setState({Price})}
                    value={this.state.Price.toString()}
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
