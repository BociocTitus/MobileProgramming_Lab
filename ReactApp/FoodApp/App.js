import React from 'react';
import Main from './App/Main.js';
import {StackNavigator} from 'react-navigation';
import AddOrder from './App/AddOrder'
global.dataArray = [
  {
    id:1,
    Food:'dfsa',
    Price:2.3
  },
  {
    id:2,
    Food:'dfsazz',
    Price:3.3
  }
]
global.id = 3;
const ModalStack = StackNavigator({
  Home: {
    screen: Main,
  },
  Profile: {
    path: 'addOrder/:order',
    screen: AddOrder,
  },
});

export default ModalStack;
