import React from 'react';
import Main from './App/Pages/Main.js';
import {StackNavigator} from 'react-navigation';
import AddOrder from './App/Pages/AddOrder';
import PieChartBasic from './App/Pages/Charts';
import LoginComponent from "./App/Pages/Login";
global.dataArray = [];
global.modifiedOffline = [];
global.handleCreate = function(order){
    global.dataArray.push(order);
};
global.handleEdit = function(order){
    for(let i =0;i<global.dataArray.length;i++){
        if(global.dataArray[i]._id === order._id){
            global.dataArray[i] = order;
        }
    }
};
global.handleDelete = function(id){
    for(let i =0;i<global.dataArray.length;i++){
        if(global.dataArray[i]._id === id){
            alert('deleted');
            global.dataArray.splice(i,1);
        }
    }
};
const ModalStack = StackNavigator({
    Login: {
        screen: LoginComponent
    },
    Home: {
        screen: Main,
        navigationOptions:{
            headerLeft:null,
        }

    },
    Charts: {
        screen: PieChartBasic,
    },
    Profile: {
        screen: AddOrder,
    },
});

export default ModalStack;
