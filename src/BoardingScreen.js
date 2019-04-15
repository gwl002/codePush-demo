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
            showProgressBar:false,
         };

         this.syncImmediate = this.syncImmediate.bind(this);
         this._immediateUpdate = this._immediateUpdate.bind(this);
     }

     componentDidMount(){
        console.log("did mounted");
        this.syncImmediate();        
     }

     syncImmediate(){
        CodePush.checkForUpdate().then(update=>{
            SplashScreen.hide();
            console.log("updated");
            if(!update){
                //goto main page
                this.props.navigation.navigate("Main");
            }else{
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
                // updateDialog: {
                //     // appendReleaseDescription: true,
                //     // descriptionPrefix: '\n\n更新内容：\n',
                //     // title: '更新',
                //     // mandatoryUpdateMessage: '',
                //     // mandatoryContinueButtonLabel: '更新',
                // },
                // mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
                installMode: CodePush.InstallMode.IMMEDIATE,
                // deploymentKey: 'D_cFC_2V-E_18nHpZxj7I-kbPC0zryQPBZQtN',
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
        }
        this.setState({
            syncMessage
        })
     }

     handleCodePushProgressChange(progress){
        let currProgress = parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(2);
        this.setState({
            currProgress:currProgress
        })
     }

     render() {
         return (
            <View style={{flex:1}}>
                <Image source={{uri :'asset:/images/launch_screen.png'}} style={{width:"100%",height:"100%"}}/>
                {this.state.showProgressBar &&
                    <View style={{position:"absolute",justifyContent:"center",alignItems:"center",width:winWidth,height:winHeight,backgroundColor:"transparent",}}>
                        <Progress progress={this.state.currProgress} />
                        <Text>{this.state.syncMessage}</Text>
                    </View>
                }
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

