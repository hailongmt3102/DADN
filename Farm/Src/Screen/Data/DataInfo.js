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



export default function DataInfo(props) {
	const dataUUID = props.dataUUID || (props.route && props.route.params.dataUUID);
	
	const [hasCrop, setHasCrop] = useState(false)
	const get_data = async () => {

		const data = await axiosInstance.get("/api/farms/fields/datas/get", { params: { uuid: dataUUID } })
			.then(resp => {
				return resp.data.data
			})

		return handleData(data)
	}

	const handleData = (data) => {
		if (!data) return []
		setHasCrop(true)
		return [
			{ key: 'air_temperature', value: data.air_temperature },
			{ key: 'air_humidity', value: data.air_humidity },
			{ key: 'ground_humidity', value: data.ground_humidity },
			{ key: 'updated_at', value:  convertDate(data.updated_at) },
		]
	}

	const convertDate = (value) => {
		try {
			return dateToDDMMYYYY(stringToDate(value))
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