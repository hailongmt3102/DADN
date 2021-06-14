import React, { useState, useEffect } from 'react';
import { Switch, TouchableOpacity, View, Image, Text, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axiosInstance, { baseURL } from "../Context/Axios";
import {   stack_navigate } from '../Context/NavigationRoot';
import { get_access_token } from '../Context/AsyncStorage';
import Request from '../Context/Request';
import { ListItem, Avatar } from 'react-native-elements';
import { key_set } from "../Context/MyTool"
import { shouldUseActivityState } from 'react-native-screens';
// import userLogin from './userLogin';
const listFieldsScreen = (props) => {

	// stack_navigate("fieldPage", { field_id: 1, headerTitle: "" })

	const [data, setData] = useState({})
	// const [loading, setLoading] = useState(false)

	const get_data = async () => {
		(axiosInstance.get("/api/farm/fields/").then(resp => {
			setData(resp.data)
		}))
	}

	useEffect(() => {
		if (!data["id"]) {

			get_data()
		}
	})


	if (data["id"]) {

		return (
			<ScrollView
				style={styles.container}

			>

				<View>
					{
						data["fields_of_farm"].map((field, index) => {

							let image = "/Media/production_image/default.jpg"

							if (field["crop_of_field"])
								image = field["crop_of_field"]["crop_production"]["production_image"]
							return (
								<ListItem key={index} style={styles.field_container} bottomDivider topDivider>

									<TouchableOpacity

										onPress={() => {
											stack_navigate("fieldPage", { ...props, field_id: field["id"] })
										}}
										style={styles.field_data_title}>
										<Image
											source={{ uri: baseURL + image }}
											style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 1 }}
										/>

										<ListItem.Title style={{ paddingLeft: 10 }}>{"FIELD NO." + field.field_location_index}</ListItem.Title>
									</TouchableOpacity>


									<ListItem.Subtitle>
										<Switch
											trackColor={{ false: "#767577", true: "#81b0ff" }}
											thumbColor={field["data_of_field"]["is_relay_on"] ? "#f5dd4b" : "#f4f3f4"}
											ios_backgroundColor="#3e3e3e"
											onValueChange={() => {

												(axiosInstance.post(
													"/api/field/" + field["id"] + "/toggle/",
													{
														"relay":
															!field["data_of_field"]["is_relay_on"]
													}

												)
													.then(resp => {
														return resp.data

													}).then(resp => {
														let temp_data = { ...data }
														temp_data["fields_of_farm"][index]["data_of_field"]["is_relay_on"]
															= resp["is_relay_on"]
														
														setData(temp_data)
													}))
												let temp_data = { ...data }
												temp_data["fields_of_farm"][index]["data_of_field"]["is_relay_on"] =
													!data["fields_of_farm"][index]["data_of_field"]["is_relay_on"]
												
												setData(temp_data)

											}}
											value={field["data_of_field"]["is_relay_on"]}
										/>
									</ListItem.Subtitle>
								</ListItem>
							)
						})
					}
				</View>
				<View style={styles.button_container}>
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
	image_container: {

	},
	fields_container: {},
	button_container: {
		flex: 1,
		width: width,
		flexDirection:"row",
		// backgroundColor:"red",
		justifyContent: "space-evenly",
		paddingTop: 20,
	},
	field_container: {},
	avatar: { width: 20 },
	field_data_title: {
		flex: 1, flexDirection: "row",
		alignItems: "center"
	},
	button: {
		// flex:1,
		borderRadius: 20,
		height: 40,
		width: 150,
		alignItems: 'center',
		backgroundColor: '#9A79FE',
		justifyContent: 'space-evenly',
		margin: "auto",
		textAlign: 'center',
		flexDirection: 'row',

	},
})


export default listFieldsScreen;