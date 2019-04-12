 import React, {
     Component
 } from 'react';
 import {
     Platform,
     StyleSheet,
     Text,
     TextInput,
     View,
     Button,
     TouchableOpacity,
     Image,
     Alert,
     FlatList,
     Linking,
     Dimensions,
 } from 'react-native';

 import Loading from './Loading';

import codePush from "react-native-code-push";
import SplashScreen from 'react-native-splash-screen';

let {height: winHeight, width: winWidth} = Dimensions.get('window');

 export default class BoardingScreen extends React.Component {
     static navigationOptions = {
         header:null
     };

     constructor(props) {
         super(props);
         this.state = {
             bgColor:'#F5FCFF',
             name: '',
             password: "",
             list: [1, 2, 3, 4],
             isLoading:false,
         }
     }

     componentDidMount(){
        SplashScreen.hide();
     }

     render() {
         return (
            <View style={{flex:1}}>
                <Image source={{uri :'asset:/images/launch_screen.png'}} style={{width:"100%",height:"100%"}}/>
                <View style={{position:"absolute"}}>
                    <Text>Loading</Text>
                </View>
            </View>
         );
     }
 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         justifyContent:"center",
         alignItems:"center",
     },

 });

