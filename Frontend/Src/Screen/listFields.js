import React, { useState, useEffect } from 'react';
import {
	RefreshControl,
	Switch,
	TouchableOpacity,
	View,
	Image,
	Text,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
	ScrollView
} from 'react-native';
import axiosInstance, { baseURL } from "../Context/Axios";
import { stack_navigate } from '../Context/NavigationRoot';
import { ListItem } from 'react-native-elements';
// import userLogin from './userLogin';
const listFieldsScreen = (props) => {


	const [data, setData] = useState({})


	const get_data = async () => {
		(axiosInstance.get("/api/farm/fields/").then(resp => {
			setData(resp.data)
		}))
	}

	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		axiosInstance.get("/api/farm/renew/").then(resp => {
			setData(resp.data)
		}).then((data) => {
			setRefreshing(false);
		})
	}, []);

	const [is_loaded, setLoaded] = useState(false)
	const [first_load, setFirstLoad] = useState(false)

	useEffect(() => {
		setFirstLoad(!first_load)
	}, [])

	useEffect(() => {
		if (first_load)
			get_data()
	}, [first_load])

	useEffect(() => {
		if (first_load)
			setLoaded(!is_loaded)
	}, [data])

	if (is_loaded) {

		return (
			<ScrollView
				style={styles.container}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
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
		flexDirection: "row",
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