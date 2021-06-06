import React, { useCallback, useEffect, useState } from 'react';
import {ActivityIndicator, View, Text , RefreshControl, Image, TouchableHighlight, ScrollView, Switch, StyleSheet, SafeAreaView} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import styles from '../styles/st_home';
import axiosInstance, { baseURL } from '../../axios';
import {navigate} from '../NavigationRoot';


function listFieldsScreen ({navigation}) {
    const [data, setData] = useState({})
    const [refreshing, setrefreshing] = useState(false);

	const get_data = () => {
		console.log(axiosInstance.get("api/farm/fields/").then(resp => {
			setData(resp.data)
		}))
        setrefreshing(false)
	}

    useEffect(()=>{
            if (!data["id"]) {
                get_data()
            }
    }, []);

    const onpress = (id) => {
        // TODO
    }

    const _onrefresh = useCallback(() => {
        setrefreshing(true)
        get_data()
    })

    if (data["id"]) {
		console.log(data)
		return (
			<ScrollView style={styles.container} 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onrefresh}
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
        <View styles={styles.container}>
            <ActivityIndicator/>
        </View>
	)
}


export default listFieldsScreen;