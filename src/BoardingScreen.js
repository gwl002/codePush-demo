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

 import Progress from "./Progress.js";

import CodePush from "react-native-code-push";
import SplashScreen from 'react-native-splash-screen';

let {height: winHeight, width: winWidth} = Dimensions.get('window');

 export default class BoardingScreen extends React.Component {
     static navigationOptions = {
         header:null
     };

     constructor(props) {
         super(props);
         this.state = {
            currProgress:0,
         };
     }

     componentDidMount(){
        SplashScreen.hide();
        CodePush.sync(
            {
                updateDialog: {
                    appendReleaseDescription: true,
                    descriptionPrefix: '\n\n更新内容：\n',
                    title: '更新',
                    mandatoryUpdateMessage: '',
                    mandatoryContinueButtonLabel: '更新',
                },
                mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
                // deploymentKey: 'D_cFC_2V-E_18nHpZxj7I-kbPC0zryQPBZQtN',
            },
            this.handleCodePushStatusChange.bind(this),
            this.handleCodePushProgressChange.bind(this)
        );
        // let _this = this;
        // this.timer = setInterval(function(){
        //     if(_this.state.currProgress <1){
        //         _this.setState({currProgress:_this.state.currProgress+0.1})
        //     }else{
        //         clearInterval(_this.timer)
        //     }
        // },500)
     }

     handleCodePushProgressChange(syncStatus){
        switch(syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
              this.syncMessage = 'Checking for update'
              break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              this.syncMessage = 'Downloading package'
              break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
              this.syncMessage = 'Awaiting user action'
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              this.syncMessage = 'Installing update'
              break;
            case CodePush.SyncStatus.UP_TO_DATE:
              this.syncMessage = 'App up to date.'
              break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
              this.syncMessage = 'Update cancelled by user'
              break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              this.syncMessage = 'Update installed and will be applied on restart.'
              Alert.alert("install completed");
              break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
              this.syncMessage = 'An unknown error occurred'
              break;
        }
     }

     handleCodePushProgressChange(progress){
        console.log(this);
        let currProgress = parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(2);
        this.setState({
            currProgress:currProgress
        })
     }

     render() {
         return (
            <View style={{flex:1}}>
                <Image source={{uri :'asset:/images/launch_screen.png'}} style={{width:"100%",height:"100%"}}/>
                <View style={{position:"absolute",justifyContent:"center",alignItems:"center",width:winWidth,height:winHeight,backgroundColor:"transparent",}}>
                    <Progress progress={this.state.currProgress} />
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

