import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  Button,
  ListView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Communications from 'react-native-communications';
export default class AddOrder extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id:0
      ,Food:""
      ,Price:""};
      if(this.props.navigation.state.params.id !== undefined){
        var order = this.props.navigation.state.params;
        this.state.Food = order.Food;
        this.state.Price = order.Price;
        this.state.id = order.id;
      }
  }
  save(){
    if(this.state.id === 0){
      var order = {
        id:0
        ,Food:this.state.Food
        ,Price:Number(this.state.Price)};
        global.id = global.id + 1;
        global.dataArray.push(order);
        Communications.email("titus.bocioc@gmail.com",["titus.bocioc@gmail.com"] , null,"FoodApp mail", JSON.stringify(order));
      }
    else{
          order = this.state;
          for(var i =0;i<global.dataArray.length;i++){
            if(global.dataArray[i].id === order.id){
              global.dataArray[i] = order;
            }
          }
      }
      this.props.navigation.navigate("Home");

  }
  render(){



    return(
      <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(Food)=>this.setState({Food})}
        value={this.state.Food}
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        keyboardType = 'numeric'
        onChangeText={(Price)=>this.setState({Price})}
        value={this.state.Price.toString()}
      />
      <Button
        title="save"
        onPress={()=>this.save()}/>
        </View>
    );
  }
}
