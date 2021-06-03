import React, { useState, useEffect } from 'react';
import { View, Image, Text, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axiosInstance, { baseURL } from "../../axios";
import { navigate } from '../NavigationRoot';
import { get_access_token } from '../AsyncStorage';
import axios from 'axios';
import { ListItem } from 'react-native-elements';
import { key_set } from "../Context/key2text"
const tab = createMaterialTopTabNavigator();

function homePageScreen() {

	const [farm, setFarm] = useState({});
	const [productions, setProductions] = useState();

	return (
		<tab.Navigator>
			<tab.Screen name="Nông trại">
				{() => <Your_fame data={{ farm, setFarm }} />}
			</tab.Screen>
			<tab.Screen name="Sản phẩm" component={Productions} />
		</tab.Navigator>
	)
}

const Your_fame = (props) => {
	const { farm, setFarm } = props.data
	useEffect(
		() => {
			if (!farm["id"]) {
				axiosInstance.get("/api/farm/").then(resp => setFarm(resp.data))
			}

		}
	)
	console.log("hello world")
	console.log("hi", farm)
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<View style={styles.button_container}>
					<TouchableHighlight
						style={styles.button}
						onPress={() => { console.log(farm) }}
					>
						<Text style={styles.innerbtn}>Cập nhật</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={styles.button}
						onPress={() => { navigate("ListFieldsScreen", {}) }}
					>
						<Text style={styles.innerbtn}>Kiểm tra</Text>
					</TouchableHighlight>

				</View>
				<View style={styles.image_container}>
					<Image
						// style={styles.image}
						source={{
							uri: "https://images.pexels.com/photos/4717019/pexels-photo-4717019.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
						}}
					/>
				</View>

				<View style={styles.datas_container}>
					{
						Object.keys(farm).map((key, index) => {
							if (key != "farm_image")
								return (
									< ListItem key={index} bottomDivider>
										<ListItem.Title >{key_set[key]}</ListItem.Title>
										<ListItem.Content>
											{farm[key]}
										</ListItem.Content>
									</ListItem>
								)
						})
					}
				</View>



			</View>
		</SafeAreaView >
	)

}

// get production from server .......
// TODO
const list = [
	{
		image: '../images/imageDefault.png',
		title: 'Production name'
	},
	{
		image: '../images/imageDefault.png',
		title: 'Production name'
	}
]

// TODO
const Productions = () => {
	return (
		<SafeAreaView>
			<View>
				<Text>
					toto: make list her
          </Text>
			</View>
		</SafeAreaView>
	)
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FBFDFE',
		width: width,
		height: 700

	},
	image_container: {
		flex: 3,
		backgroundColor: "red",
	},
	datas_container: {
		flex: 8,
	},
	button_container: {
		flex: 2,
		flexDirection: 'row',
		backgroundColor: "coral",
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


export default homePageScreen;