import React from 'react';
import Main from './App/Main.js';
import {StackNavigator} from 'react-navigation';
import AddOrder from './App/AddOrder';
import PieChartBasic from './App/Charts';
global.dataArray = [];
global.id = 1;
const ModalStack = StackNavigator({
    Home: {
        screen: Main,
    },
    Profile: {
        path: 'addOrder/:order',
        screen: AddOrder,
    },
    Charts: {
        screen: PieChartBasic
    }
});

export default ModalStack;
