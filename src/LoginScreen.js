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
 } from 'react-native';

import Loading from './Loading';

export default class Login extends React.Component {
     static navigationOptions = {
         title: 'Login',
         headerStyle:{
            backgroundColor:'#1ab394',
            color:"#ffffff"
         },
         headerTitleStyle:{
            flex:1,
            textAlign:'center',
            color:"#ffffff"
         }
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

     componentDidMount() {
         
     }

     login = () => {
        this.setState({isLoading:true})
        var _this = this;
        fetch('https://api-gateway-zhcpteam4.azure-api.net/user/serviceA/login/admin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'userName': _this.state.name,
                'pw': _this.state.password,
            }),
        }).then(res=>res.json())
        .then((res) => {
            this.setState({isLoading:false})
            console.log('res='+JSON.stringify(res))
            if(res.status_code==0){
                _this.props.navigation.navigate('Profile', {
                    'userId': res.result.userId
                })
            }else{
                Alert.alert(
                  'Error',
                  res.status_message,
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
            }
        })
       .catch((error) =>{
            this.setState({isLoading:false})
            console.error('error='+error);
          });
     }

     changeToFirstBgcolor=()=>{
        this.setState({isLoading:true})
        // 点击按钮call API返回一个字符串，设置为页面背景颜色1
        return fetch('https://api-gateway-zhcpteam4.azure-api.net/api_1/api/demo')
          // .then((response) => response.json())
          .then((result) => {
            this.setState({isLoading:false})
            let bgColor1=result._bodyInit
            this.setState({
              bgColor:bgColor1
            }, function(){

            });

          })
          .catch((error) =>{
            this.setState({isLoading:false})
            console.error(error);
          });
         // Linking.openURL("https://partsunlimited-api-vjyn4qb4solrw.azurewebsites.net/api/demo")
     }


     changeToSecondBgcolor=()=>{
        this.setState({isLoading:true})
        // 点击按钮call API返回一个字符串，设置为页面背景颜色2
        return fetch('https://api-gateway-zhcpteam4.azure-api.net/api_2/api/demo')
          // .then((response) => response.json())
          .then((result) => {
            this.setState({isLoading:false})
            let bgColor2=result._bodyInit
            this.setState({
              bgColor:bgColor2
            }, function(){

            });

          })
          .catch((error) =>{
            this.setState({isLoading:false})
            console.error(error);
          });
     }

     render() {
         return (

             <View style={{flex:1}}>
            {this.state.isLoading? <Loading size="large" color="#00f" />:null}
                <View style={[styles.container,{backgroundColor:this.state.bgColor}]}>
                    <Text style={styles.welcome}>Welcome 1234!</Text>
                    <Text style={styles.welcome}>Welcome 5678!</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(name) =>this.setState({name})}
                      placeholder="Name"
                      value={this.state.name}
                    />
                    <TextInput
                      style={styles.input}
                      onChangeText={(password) =>this.setState({password})}
                      placeholder="Password"
                      value={this.state.password}
                    />
                    <TouchableOpacity style={styles.btn} onPress={this.login}>
                      <Text style={{color:"#fff"}}> Login </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={this.changeToFirstBgcolor}>
                      <Text style={{color:"#fff"}}> ChangeBgcolorToBgcolor1 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={this.changeToSecondBgcolor}>
                      <Text style={{color:"#fff"}}> ChangeBgcolorToBgcolor2 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={()=>{}}>
                      <Text style={{color:"#fff"}}> Azure devOps automated release test! </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text>test</Text>
                    </TouchableOpacity>
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
     welcome: {
         fontSize: 20,
         textAlign: 'center',
         margin: 10,
     },
     instructions: {
         textAlign: 'center',
         color: '#333333',
         marginBottom: 5,
     },
     input: {
         borderColor: 'gray',
         borderWidth: 1,
         width: 300,
         margin: 10,
         borderRadius: 5,
         paddingLeft:10,
         paddingVertical:Platform.OS === "ios"?10:0
     },
     btn: {
         alignItems: 'center',
         backgroundColor: '#1ab394',
         padding: 10,
         width: 300,
         height: 45,
         borderColor: '#1ab394',
         borderWidth: 1,
         marginVertical: 10,
         borderRadius: 5
     },
     btnCallApi: {
         alignItems: 'center',
         backgroundColor: '#1ab394',
         padding: 10,
         width: 300,
         height: 45,
         borderColor: '#1ab394',
         borderWidth: 1,
         margin: 10,
         borderRadius: 5
     },
     profileContainer:{
        flex:1,
        backgroundColor:"#eee"
     },
     topBar:{
        flexDirection:"row",
        justifyContent:"space-around",
     },
     topBarBtn:{
        justifyContent:"center",
        padding:10,
        // margin:3,
        alignItems: 'center',
        backgroundColor: '#1ab394',
        width: "46%",
        height: 45,
        borderColor: '#1ab394',
        borderWidth: 1,
        borderRadius:5,
        margin:5,
     },
     storeItem:{
        flexDirection:"row",
        alignItems:"center",
        marginLeft:20,
        marginVertical:5,
        backgroundColor:"#fff",
     },
     image:{
        width:80,
        height:80,
        marginRight:20,
     },
     content:{
        padding:15,
        flex: 1,
        flexDirection: 'row',
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
     },
     pleft:{
        marginLeft:15,
        flex:1
     },
     wrap:{
        flexWrap: 'wrap',
     },
     title:{
        fontSize:18,
        color:"#000000"
     },
 });

