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


 class ProfileScreen extends React.Component {
         static navigationOptions = ({navigation}) => {
            const params = navigation.state.params || {};
            return {
                title: params.title || "userList",
                headerStyle:{
                   backgroundColor:'#1ab394'
                },
                headerTintColor:"#ffffff",
                headerTitleStyle:{
                   flex:1,
                   textAlign:'center'
                },
                headerRight: (<View />)
            }
         }

         constructor(props) {
             super(props);
             this.state = {
                 userId:props.navigation.state.params.userId,
                 userList:[],
                 storeList: [],
                 showList:"userList"
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

         getStoreList(){
            var _this = this;          
            fetch('https://api-gateway-zhcpteam4.azure-api.net/store/serviceB/store/storelist', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'userId': "xxxxx",
                }),
            })
            .then(res => res.json())
            .then(function(res){
                _this.setState({
                    storeList:res.result
                })
            }).catch(err=>{
                console.log(err);
            })
         }

         componentDidMount(){
            this.getUserList();
            this.getStoreList();
         }

         renderItem({item}){
            if(this.state.showList === "userList"){
                return (
                        <TouchableOpacity style={styles.content}>
                            <View style={styles.pleft}>
                                  <Text style={styles.wrap,styles.title}>{item.userName}</Text>
                                  <Text style={styles.wrap}>{item.mobile}</Text>
                            </View>
                        </TouchableOpacity>
                    )
            }else{
                return (
                    <TouchableOpacity key={item.storeId} >
                        <View style={styles.storeItem}>
                            <Image source={{uri:item.storeImage}} style={styles.image} />
                            <Text>{item.storeName}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            
         }

         render() {
                 return (
                    <View style={styles.profileContainer}>
                        <View style={styles.topBar}>
                            <TouchableOpacity 
                                style={styles.topBarBtn}
                                onPress={()=>{
                                    this.setState({showList:"userList"})
                                    console.log(this.props.navigation)
                                    this.props.navigation.setParams({title:"userList"})
                                }}
                            >
                                <Text style={styles.btnText}>User List</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.topBarBtn}
                                onPress={()=>{
                                    this.setState({showList:"storeList"})
                                    this.props.navigation.setParams({title:"storeList"})
                                }}
                            >
                                <Text style={styles.btnText}>Store List</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            contentContainerStyle={{backgroundColor:"#eee"}}
                            data = {this.state.showList === "userList"?this.state.userList:this.state.storeList}
                            renderItem = {this.renderItem.bind(this)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                </View>
         );
     }
 }

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
 });

 export default createAppContainer(App);