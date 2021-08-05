import React, {
	useState
} from 'react'
import {
	ScrollView,
	Text,
	View,
	StyleSheet,
	Image,
} from 'react-native'

import axiosInstance from '../../Context/Axios'
import Button from '../../Component/Button'
import ListView from '../../Component/ListView'
import { dateToDDMMYYYY, key_set, stringToDate } from '../../Context/MyTool'



export default function IrrigationInfo(props) {
	const irrigationUUID = props.irrigationUUID || (props.route && props.route.params.irrigationUUID);
	
	const get_data = async () => {

		const data = await axiosInstance.get("/api/farms/fields/irrigations/get", { params: { uuid: irrigationUUID } })
			.then(resp => {
				return resp.data.data
			})

		return handleData(data)
	}

	const handleData = (data) => {
        console.log('iri_data',data)
		if (!data) return []
		
		return [
			{ key: 'start_at', value: convertDate(data.start_at) },
			{ key: 'end_at', value: convertDate(data.end_at) },
			{ key: 'amount', value: data.amount },
			
		]
	}

	const convertDate = (value) => {
		try {
			return stringToDate(value).toLocaleString()
		} catch (exc) {
			return value
		}
	}


	const map_function = (data) => {
			return {
				title: key_set[data.key],
				image: null,
				subtitle: <Text>{new String(data.value)}</Text>,
				navigate_function: () => { }
			}
	}


	return (
		<ScrollView>
			<ListView
                static={true}
				get_data={get_data}
				map_function={map_function}
			/>
		</ScrollView>
	)

}


const styles = StyleSheet.create({
	image_container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
})