 /**
  * Sample React Native App
  * https://github.com/facebook/react-native
  *
  * @format
  * @flow
  * @lint-ignore-every XPLATJSCOPYRIGHT1
  */
  
 import React from 'react';

 import {
     createStackNavigator,
     createBottomTabNavigator,
     createAppContainer
 } from 'react-navigation';


 import LoginScreen from "./src/LoginScreen.js";
 import ListScreen from "./src/ListScreen.js";
 import BoardingScreen from "./src/BoardingScreen.js";

  const App = createStackNavigator({
     Boarding:{
        screen: BoardingScreen
     },
     Main: {
         screen: LoginScreen
     },
     Profile: {
         screen: ListScreen
     },
 },{
    initialRouteName: "Main"
 });

 export default createAppContainer(App);