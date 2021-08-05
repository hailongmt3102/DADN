import React, { useState, useEffect } from 'react';
import {
	RefreshControl,
	TouchableOpacity,
	View,
	Image,
	Text,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
	ScrollView
} from 'react-native';
import axiosInstance, { baseURL } from "../../Context/Axios";
import { ListItem } from 'react-native-elements';
import Switch from '../../Component/Switch';
import Button from '../../Component/Button';
// import userLogin from './userLogin';
const FieldsList = (props) => {
	const { farmUUID } = props.route.params

	const [data, setData] = useState()

	const parseData = (data) => {
		if (data) {
			return {
				'uuid': data.uuid,
				'index': data.location_index,
				'air_temperature': data.latest_data.air_temperature,
				'air_humidity': data.latest_data.air_humidity,
				'relay': data.latest_data.relay,
				'ground_humidity': data.latest_data.ground_humidity,
			}
		}
	}

	const handleData = (data) => {
		if (data) {
			const map_data = {}
			data.map((entry, index) => {
				map_data[entry.uuid] = parseData(entry)
			})
			return map_data
		}
		else return {}
	}

	const get_data = async () => {

		const resp_data = await axiosInstance.post(
			"api/farms/fields/matrix", { farm_uuid: farmUUID }
		).then(resp => resp.data.data)
		console.log(resp_data)
		setData(handleData(resp_data));
	}


	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		get_data().then(() => setRefreshing(false));
	}, []);

	const [is_loaded, setLoaded] = useState(false)
	const [first_load, setFirstLoad] = useState(false)

	useEffect(() => {
		get_data()
	}, [])

	const handleRelayChange = (key) => {
		console.log(data)
		console.log(key)
		console.log(data[key])
		const relay = !data[key]["relay"]
		axiosInstance.post("/api/farms/fields/toggle", {
			'uuid':key,
			"relay": relay
		})
			.then(
				resp => handleData(resp.data.data)
			).then(data => {
				setData(data)
			})
			const new_data = {...data}
			new_data[key] = {...data[key],relay:relay}
			setData(new_data)
	}

	const contentGen=() => {
		if (data) {
			return (Object.keys(data).map((key) => {
				return (
					<ListItem key={key} style={styles.field_container} bottomDivider topDivider>

						<TouchableOpacity

							onPress={() => {
								props.navigation.push('Field',{fieldUUID:key,farmUUID:farmUUID})
							}}
							style={styles.field_data_title}>
							{/* <Image
								source={{ uri: baseURL + image }}
								style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 1 }}
							/> */}

							<ListItem.Title style={{ paddingLeft: 10 }}>{"FIELD NO." + data[key].index}</ListItem.Title>
						</TouchableOpacity>


						<ListItem.Subtitle>
							<Switch
								
								value = {data[key].relay}
								onPress={()=>handleRelayChange(key)}

									
							/>
						</ListItem.Subtitle>
					</ListItem>
				)

			})
			)
		}
		else {
			return (
				<ListItem bottomDivider>
					<ListItem.Title style={[{ marginTop: 10 }]}>
						Loading
					</ListItem.Title>
				</ListItem>
			)
		}
	}


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
					contentGen()
				}
			</View>

			<Button
			textContent={'New'}
			buttonStyle ={{alignSelf:'center'}}
			onPress={()=>{props.navigation.push('CreateField',{farmUUID})}}
			/>

		</ScrollView>
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


export default FieldsList;