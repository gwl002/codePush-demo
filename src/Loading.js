import { View, Text, StyleSheet, Platform, TouchableOpacity, ActivityIndicator,Dimensions,DeviceEventEmitter} from "react-native";
import React from 'react';

let instance = null;

export default class Loading extends React.Component{
	constructor(props){
		super(props);

		if (!instance) {
         instance = this;
        }

        this.state={
          isLoading:true,
         };

        return instance;
	}

	setLoading(loading){
		console.log("******** setting loading *******")
		// this.setState({isLoading:loading})
		DeviceEventEmitter.emit('HAGO_APP_LOADING_STATUS_CHANGE', loading);
	}


	static ShareInstance(){
    let singleton = new Loading();
    return singleton;
    }

	render(){
		return (
			<View style ={styles.background}>
				<ActivityIndicator size="large" color='white' style={styles.loading} />
			</View>
			
		)
	}
}


const styles = StyleSheet.create({
	background:{
		flex:1,
		position:"absolute",
		// height:Dimensions.get('window').height,
		left:0,
		right:0,
		top:0,
		bottom:0,
		zIndex:10000000,
		backgroundColor:"rgba(0,0,0,0.5)",
		justifyContent:"center",
		alignItems:"center"
	},
	loading:{

	}
})