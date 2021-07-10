import React, {
	useCallback,
	useState,
	useEffect
} from 'react'
import {
	ScrollView,
	View,
	Text,
	Image,
	SafeAreaView,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
	RefreshControl
} from 'react-native'

import { key_set } from '../Context/MyTool'
import axiosInstance, { baseURL } from '../Context/Axios'
import {
	ListItem,
	// List
} from 'react-native-elements'



export default function Your_fame(props) {
	const { farm, setFarm } = props.data

	const get_data = () => {
		return axiosInstance.get("api/farm/")
			.then(resp => {
				setFarm(resp.data)
				return resp
			})
	}

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		get_data().then(() => setRefreshing(false));
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
	}, [farm])

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}


			>

				<View style={styles.image_container}>
					<Image source={{ uri: baseURL + farm["farm_image"] }}
						style={{ width: 200, height: 200 }} />
				</View>

				<View style={styles.datas_container}>
					{
						Object.keys(farm).map((key, index) => {
							const exclude = ["farm_image", "id"]

							if (exclude.indexOf(key) == -1)
								return (
									< ListItem key={index} bottomDivider topDivider style={styles.data_container}>
										<ListItem.Title key={100 + index} style={styles.data_title}>{key_set[key]}</ListItem.Title>
										<ListItem.Subtitle key={200 + index} style={styles.data_subtitle}>{farm[key]}</ListItem.Subtitle>
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
						<Text style={styles.innerbtn}>Edit</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={styles.button}
						onPress={() => {
							props.navigation.navigate("ListFieldsScreen", { ...props })
						}}
					>
						<Text style={styles.innerbtn}>Fields</Text>
					</TouchableHighlight>

				</View>

			</ScrollView>
		</SafeAreaView >
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