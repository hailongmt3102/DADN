import React, { useState, useContext, useEffect } from 'react';
import {

	StyleSheet,
	Dimensions,

} from 'react-native';

import {
	createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';

import Context from '../Context/Context';

import {
	get_mem,
} from '../Context/AsyncStorage'

import BackgroundTimer from 'react-native-background-timer';

import FarmsList from './Farm/FarmsList'
import ProductionsList from './Production/ProductionsList';
import { ToggleField } from '../Context/MyTool';
const tab = createMaterialTopTabNavigator();

function Home(props) {
	
	
	
	return (
	
			<tab.Navigator>
				<tab.Screen name="Farm">
					{() => <FarmsList {...props} />}
				</tab.Screen>
				<tab.Screen name="Production">
					{() => <ProductionsList {...props} />}
				</tab.Screen>
			</tab.Navigator>
		
	)
}
export default Home;

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FBFDFE',
		width: width,
		height: (height),
		// backgroundColor: "red",
	},
	image_container: {
		flex: 1,
		// height: 200,
		alignItems: "center",
		justifyContent: "center"
	},
	datas_container: {
		flex: 1,
		// height: 400,
		// backgroundColor:"red"
	},
	data_container: {
		// flex: 8,
		// height: 70,

		// backgroundColor:"red"
	},
	data_title: {
		flex: 1
	},
	data_subtitle: {

	},
	button_container: {
		flex: 1,
		flexDirection: 'row',
		// backgroundColor: "coral",
		justifyContent: "space-evenly",
		alignItems: "center"
	},
	button: {
		borderRadius: 20,
		height: 40,
		width: 150,
		alignSelf: 'center',
		backgroundColor: '#9A79FE',
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 20,
		justifyContent: 'center',
		textAlign: 'center',
		flexDirection: 'row',
		// flex: 1
	},

	image: {
		height: 200,
		resizeMode: 'contain',
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 50
	},
	textline: {
		margin: 10,
		marginLeft: 20
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	text_content: {
		fontSize: 20
	},

	innerbtn: {
		color: '#FFF',
		fontSize: 18,
		alignSelf: 'center'
	},
	production_item: {
		margin: 20,
		backgroundColor: "#FFFFFF"
	}
})


