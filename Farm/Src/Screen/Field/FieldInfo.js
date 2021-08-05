import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native';
import axiosInstance from "../../Context/Axios";
import { ListItem } from 'react-native-elements';
import { key_set } from "../../Context/MyTool"
import Switch from '../../Component/Switch'
// import styles from '../../assets/styles/st_login';
const FieldInfo = (props) => {

	const { fieldUUID } = props;
	const [data, setData] = useState()


	const convertDate = (value) => {
		try {
			return dateToDDMMYYYY(stringToDate(value))
		} catch (exc) {
			return value
		}
	}

	const handleData = (data) => {
		if (data) {
			return {
				'index': data.location_index,
				'length': data['length'],
				'width': data['width'],
				'air_temperature': data.latest_data.air_temperature,
				'air_humidity': data.latest_data.air_humidity,
				'relay': data.latest_data.relay,
				'ground_humidity': data.latest_data.ground_humidity,
				'updated_at': convertDate(data.latest_data.updated_at),
			}
		}
	}

	const get_data = () => {
		return axiosInstance.get("/api/farms/fields/get", { params: { uuid: fieldUUID } }).then(resp => {
			setData(handleData(resp.data.data))
		})
	}

	useEffect(() => {
		get_data()
	}, []
	)

	let valid_set = [
		'index',
		'length',
		'width',
		'relay',
		'air_temperature',
		'air_humidity',
		'ground_humidity',
		'updated_at',
	]

	const handleRelayChange = () => {
		const relay =  !data['relay']
		axiosInstance.post("/api/farms/fields/toggle", {
			'uuid': fieldUUID,
			"relay": relay
		})
			.then(
				resp => {
					const data = resp.data.data
					if (data != 'Fail')
						return handleData(resp.data.data)
					
						else return null 
					}
			).then(handle_data => {
				if (handle_data)
					setData(handle_data)
				else	setData({ ...data, relay: !relay})
			})
		setData({ ...data, relay: relay})
		
	}

	const contentGen = () => {
		if (data)
			return (
				valid_set.map((key, index) => {
					let convertedData = data
					let _key = key_set[key]
					let value = convertedData[key]
					return (
						<ListItem key={index} bottomDivider>
							<ListItem.Title style={styles.data_title}>{_key}</ListItem.Title>
							{
								key !== "relay" ? (
									<ListItem.Subtitle>
										{value}
									</ListItem.Subtitle>
								) : (
									< ListItem.Subtitle >
										<Switch
											value={value}
											onPress={handleRelayChange}
										/>
									</ListItem.Subtitle>
								)
							}
						</ListItem>)
				}
				))
		else return []
	}


	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		get_data().then(() => setRefreshing(false));
	}, []);

	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			}
		>

			<View
				style={[styles.container, { width: "100%" }]}
			>
				{
					contentGen()

				}



			</View>
		</ScrollView >
	)

}



const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		backgroundColor: '#FBFDFE',
		width: width,

	},
	data_container: {

	},
	data_title: {
		flex: 1, flexDirection: "row",
		alignItems: "center"
	},
	data_value: {

	},
	button_container: {

	}

})

export default FieldInfo;