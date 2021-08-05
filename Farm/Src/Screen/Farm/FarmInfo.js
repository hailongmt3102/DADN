import React, {
} from 'react'
import {
	ScrollView,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	View
} from 'react-native'

import axiosInstance from '../../Context/Axios'
import Button from '../../Component/Button'
import ListView from '../../Component/ListView'
import { key_set } from '../../Context/MyTool'



export default function FarmInfo(props) {
	const { farmUUID } = props;

	const get_data = async () => {
		
		const data = await axiosInstance.post("/api/farms/get", { uuid: farmUUID })
			.then(resp => {
				return resp.data.data
			})

		const array = ["image", "name", "latitude", "longtitude"]
		let returnData = array.map((key) => {
			return {
				key: key,
				value: data[key]
			}
		})



		return returnData
	}


	const map_function = (data) => {
		if (data.key == 'image')
			return {
				titleStyle: {
					flex: 1,
					paddingLeft: 0
					// backgroundColor:'red'
				},
				title: (
					<View style={[styles.image_container, {  width: 330 }]}>
						<Image source={{ uri: data.value }}
							style={{ width: 200, height: 200 }} />
					</View>),
				image: null,
				subtitle: null,
				navigate_function: null
			}
		else
			return {
				title: key_set[data.key],
				image: null,
				subtitle: <Text>{data.value}</Text>,
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
			<Button
				buttonStyle={{alignSelf:'center',marginTop:10}}
				textContent = {'Fields'}
				onPress={()=>{props.navigation.push('FieldsList',{farmUUID:farmUUID})}}
			/>
		</ScrollView>
	)

}


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