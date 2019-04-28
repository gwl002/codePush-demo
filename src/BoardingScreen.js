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

 import { NativeModules } from 'react-native';

 const SplashScreen = NativeModules.SplashScreen;

import CodePush from "react-native-code-push";

let {height: winHeight, width: winWidth} = Dimensions.get('window');

 export default class BoardingScreen extends React.Component {
     static navigationOptions = {
         header:null
     };

     constructor(props) {
         super(props);
         this.state = {
            currProgress:0,
            showProgressBar:false,
         };

         this.syncImmediate = this.syncImmediate.bind(this);
         this._immediateUpdate = this._immediateUpdate.bind(this);
     }

     componentDidMount(){
        CodePush.notifyAppReady();
        this.syncImmediate();        
     }

     syncImmediate(){
        CodePush.checkForUpdate().then(update=>{
            if(!update){
                this.setState({
                    showProgressBar:false
                })
                this.props.navigation.navigate("Main");
            }else{
                SplashScreen.showProgressBar();
                this.setState({
                    showProgressBar:true
                })
                this._immediateUpdate();
            }
        }).catch(err=>{

        })
        
     }

     _immediateUpdate(){
        CodePush.sync(
            {
                updateDialog:null,
                installMode: CodePush.InstallMode.IMMEDIATE,
            },
            this.handleCodePushStatusChange.bind(this),
            this.handleCodePushProgressChange.bind(this)
        );
     }

     handleCodePushStatusChange(syncStatus){
        let syncMessage;
            switch(syncStatus) {
                case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                  syncMessage = 'Checking for update'
                  break;
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                  syncMessage = 'Downloading package'
                  break;
                case CodePush.SyncStatus.AWAITING_USER_ACTION:
                  syncMessage = 'Awaiting user action'
                  break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                  syncMessage = 'Installing update'
                  break;
                case CodePush.SyncStatus.UP_TO_DATE:
                  syncMessage = 'App up to date.'
                  break;
                case CodePush.SyncStatus.UPDATE_IGNORED:
                  syncMessage = 'Update cancelled by user'
                  break;
                case CodePush.SyncStatus.UPDATE_INSTALLED:
                  syncMessage = 'Update installed and will be applied on restart.'
                  break;
                case CodePush.SyncStatus.UNKNOWN_ERROR:
                  syncMessage = 'An unknown error occurred'
                  break;
            this.setState({
                syncMessage
            })
        }
     }

     handleCodePushProgressChange(progress){
        let currProgress = parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(2);
        this.setState({
            currProgress:currProgress,
        })
     }

     render() {
         return (
            <View style={{flex:1}}>
                
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

