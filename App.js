 /**
  * Sample React Native App
  * https://github.com/facebook/react-native
  *
  * @format
  * @flow
  * @lint-ignore-every XPLATJSCOPYRIGHT1
  */
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
 import {
     createStackNavigator,
     createBottomTabNavigator,
     createAppContainer
 } from 'react-navigation';
 import codePush from "react-native-code-push";

 type Props = {};


 class Login extends React.Component {
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
             name: '',
             password: "",
             list: [1, 2, 3, 4],
             bgColor:'#F5FCFF',
             
         }
     }

     componentDidMount() {
         codePush.sync({
             updateDialog: {
                 appendReleaseDescription: true,
                 descriptionPrefix: '\n\n更新内容：\n',
                 title: '更新',
                 mandatoryUpdateMessage: '',
                 mandatoryContinueButtonLabel: '更新',
             },
             mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
             // deploymentKey: 'D_cFC_2V-E_18nHpZxj7I-kbPC0zryQPBZQtN',
         });
     }

     login = () => {
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
        })
        .then(res => res.json())
        .then(function(res){
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
     }

     changeToFirstBgcolor=()=>{
        // 点击按钮call API返回一个字符串，设置为页面背景颜色1
        return fetch('https://partsunlimited-api-vjyn4qb4solrw.azurewebsites.net/api/demo')
          // .then((response) => response.json())
          .then((result) => {
            console.log("bgColor1="+JSON.stringify(result._bodyInit))
            let bgColor1=JSON.stringify(result._bodyInit)
            this.setState({
              bgColor:bgColor1
            }, function(){

            });

          })
          .catch((error) =>{
            console.error(error);
          });
         // Linking.openURL("https://partsunlimited-api-vjyn4qb4solrw.azurewebsites.net/api/demo")
     }


     changeToSecondBgcolor=()=>{
        // 点击按钮call API返回一个字符串，设置为页面背景颜色2
        return fetch('https://partsunlimited-api-cf3oys6viwkao.azurewebsites.net/api/demo')
          // .then((response) => response.json())
          .then((result) => {

            console.log("bgColor2="+JSON.stringify(result._bodyInit))
            let bgColor2=JSON.stringify(result._bodyInit)
            this.setState({
              bgColor:bgColor2
            }, function(){

            });

          })
          .catch((error) =>{
            console.error(error);
          });
     }
     render() {
         return (

             <View style={[styles.container,{backgroundColor:this.state.bgColor}]}>
                <Text style={styles.welcome}>Welcome!</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(name) =>this.setState({name})}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(password) =>this.setState({password})}
                  placeholder="Password"
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
            </View>
         );
     }
 }
 class ProfileScreen extends React.Component {
         static navigationOptions = {
             title: 'user List',
             headerStyle:{
                backgroundColor:'#1ab394'
             },
             headerTintColor:"#ffffff",
             headerTitleStyle:{
                flex:1,
                textAlign:'center'
             },
             headerRight: (<View />)
         };
         constructor(props) {
             super(props);
             this.state = {
                 userId:props.navigation.state.params.userId,
                 userList:[],
                 storeList: [{
                     "storeId": 14,
                     "storeName": "謝瑞麟（中港城店）",
                     "storeAddress": "尖沙咀廣東道中港城高層地下59, 60 & 61號舖",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/21/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_f32c3c1446fb47a2b7176e9c2707b205.jpg",
                 }, {
                     "storeId": 3,
                     "storeName": "莎莎（恆利大廈店）",
                     "storeAddress": "九龍尖沙咀廣東道68-80號恆利大廈",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/5/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_1249d8e3755a40c7a7f1dbb9ca047603.jpg",

                 }, {
                     "storeId": 6,
                     "storeName": "奇華餅家(中港城店)",
                     "storeAddress": "中港城一樓18號舖",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/8/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_c7d63f228dfc4bdc9921c7b136148b31.jpg",

                 }, {
                     "storeId": 27,
                     "storeName": "古春堂（吉蓮店）",
                     "storeAddress": "吉蓮路15號",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/29/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_1e34712dbce54e43b282a40e5a55da80.jpg",

                 }, {
                     "storeId": 5,
                     "storeName": "陶源酒家 (國際廣場店)",
                     "storeAddress": "iSQUARE國際廣場24樓",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/7/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_06a972146581404194c6f7fed9da1f9f.png",

                 }, {
                     "storeId": 19,
                     "storeName": "美宜佳（蓮興路店）",
                     "storeAddress": "香港尖沙咀诺士佛台诺士佛台1号",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/1/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_f76f4a6913dc488e92d4e9931b56f4ff.jpg",

                 }, {
                     "storeId": 4,
                     "storeName": "太興燒味餐廳（海港城店）",
                     "storeAddress": "尖沙咀廣東道3-27號海港城港威商場4樓4002號舖",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/6/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_faba5c6422254c0ea68ac5f75180501e.jpg",

                 }, {
                     "storeId": 15,
                     "storeName": "稻坊(五礦店)",
                     "storeAddress": "九龍尖沙咀漆咸道南79號中國五礦大廈3樓",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/22/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_977dff8c5ae3466e9fb388d09a646c49.jpg",

                 }, {
                     "storeId": 29,
                     "storeName": "report-testing(尖沙咀)",
                     "storeAddress": "香港尖沙咀",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/1/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_38ac4d680a7d4864938621a8cf1e621e.jpg",

                 }, {
                     "storeId": 25,
                     "storeName": "COMEBUY（吉大店）",
                     "storeAddress": "吉大景山路地下人防工程WB03號鋪",
                     "storeImage": "https://cdndevhkqtsa01.azureedge.net/assets/28/merchant/qpoint_hkcoupon_discount_coupon_voucher_hkshopping_8164b93df37f42a8b09e1e24f4180aee.jpg",

                 }]
             };
         }
         getUserList(){  
            var _this = this;          
            fetch('https://api-gateway-zhcpteam4.azure-api.net/user/serviceA/login/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'userId': _this.state.userId,
                }),
            })
            .then(res => res.json())
            .then(function(res){
                _this.setState({
                    userList:res.result
                })
            })
         }
         componentDidMount(){
            this.getUserList()
         }
         render() {
                 return (
                    <View>
                <FlatList
                    data = {this.state.userList}
                    renderItem = {
                        ({item})=><TouchableOpacity style={styles.content}>
                            <View style={styles.pleft}>
                                  <Text style={styles.wrap,styles.title}>{item.userName}</Text>
                                  <Text style={styles.wrap}>{item.mobile}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                </View>
         );
     }
 }
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: '#F5FCFF',
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
         borderRadius: 5
     },
     btn: {
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
     image:{
        width:80,
        height:80
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
     icon:{
        width:80
     },
     title:{
        fontSize:18,
        color:"#000000"
     }
 });

 const App = createStackNavigator({
     Main: {
         screen: Login
     },
     Profile: {
         screen: ProfileScreen
     },
 });
 export default createAppContainer(App);