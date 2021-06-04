import React, { useState, useEffect } from 'react';
import { Switch, View, Image, Text, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axiosInstance, { baseURL } from "../Context/axios";
import { navigate } from '../Context/NavigationRoot';
import { get_access_token } from '../Context/AsyncStorage';
import axios from 'axios';
import { ListItem, Avatar } from 'react-native-elements';
import { key_set } from "../Context/key2text"
// import userLogin from './userLogin';
const listFieldsScreen = (props) => {
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(false)

	const get_data = () => {
		console.log(axiosInstance.get("api/farm/fields/").then(resp => {
		
			setData(resp.data)
		}))
	}
	useEffect(() => {
		if (!data["id"]) {
			get_data()
		}
	})


	if (data["id"]) {
		console.log(data)
		return (
			<ScrollView style={styles.container} >
				<View>
					{
						data["fields_of_farm"].map((field, index) => {

							let image = "/Media/production_image/default.jpg"

							if (field["crop_of_field"])
								image = field["crop_of_field"]["crop_production"]["production_image"]
							return (
								<ListItem onPress={() => { navigate("fieldPage", {field_id:field["id"]}) }} style={styles.field_container} bottomDivider topDivider>
									<Avatar rounded source={{ uri: "https://75246de4dd17.ngrok.io/Media/production_image/default.jpg" }} />
									<ListItem.Title onValueChange={() => { }} style={styles.field_data_title}>{"FIELD NO." + field.field_location_index}</ListItem.Title>
									<ListItem.Subtitle>
										<Switch
											trackColor={{ false: "#767577", true: "#81b0ff" }}
											thumbColor={field["data_of_field"]["is_relay_on"] ? "#f5dd4b" : "#f4f3f4"}
											ios_backgroundColor="#3e3e3e"
											onValueChange={() => {
												console.log(axiosInstance.post(
													"/api/field/" + field["id"] + "/toggle/",
													{ "relay": !field["data_of_field"]["is_relay_on"] }
												)
													.then(resp => {
														console.log(resp.data)
														return resp.data
													}).then(resp => {
														let temp_data = { ...data }
														temp_data["fields_of_farm"][index]["data_of_field"]["is_relay_on"] = resp["data"]["is_relay_on"]
														console.log("new", temp_data)
														setData(temp_data)
													}))

											}}
											value={field["data_of_field"]["is_relay_on"]}
										/>
									</ListItem.Subtitle>
								</ListItem>
							)
						})
					}
				</View>
				<View>
					<TouchableHighlight
						style={styles.button}
						onPress={() => { }}
					>
						<Text style={styles.innerbtn}
						>Add Field</Text>
					</TouchableHighlight>
				</View>

			</ScrollView>
		)
	}
	else return (
		<View><Text>loading</Text></View>
	)
}
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		backgroundColor: '#FBFDFE',
		width: width,
		height: height,
		// backgroundColor: "red",
	},
	fields_container: {},
	field_container: {},
	field_data_title: { flex: 1 },
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
})


export default listFieldsScreen;