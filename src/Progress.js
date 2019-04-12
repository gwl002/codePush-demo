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

let {height: winHeight, width: winWidth} = Dimensions.get('window');

export default class Progress extends Component{
	constructor(props){
		super(props);
		this.state={
		}
	}

	// static getDerivedStateFromProps(props, state) {
	// 	if(props.progress !== state.progress){
	// 		return {
 //    			progress: props.progress
 //    		}
	// 	}
	// 	return null;
 //    }

	render(){
		return (
			<View style={{flexDirection:"row",justifyContent:"center"}}>
				<View style={{width:winWidth*0.8,height:30,backgroundColor:"#fff"}}>
					<View style={{backgroundColor:"blue",alignSelf:"flex-start",height:30,width:this.props.progress*winWidth*0.8}}></View>
				</View>
			</View>
		)
	}
}