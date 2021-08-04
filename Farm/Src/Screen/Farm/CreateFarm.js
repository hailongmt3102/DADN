// Example to Pick and Upload files in React Native
// https://aboutreact.com/file-uploading-in-react-native/

// Import React
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
// Import core components
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity
} from 'react-native';
import Button from '../../Component/Button';
import DocumentPicker from 'react-native-document-picker';
import inputStyle from '../../assets/styles/st_input';
import axiosInstance from '../../Context/Axios';

const CreateFarm = (props)=> {
	const [data, setData] = useState({});

	const submit = async () => {
		const submitData = new FormData();
		for (const item in data) {
			submitData.append(item, data[item]);
		}
		console.log(props)
		axiosInstance.post('/api/farms/create', submitData)
			.then(data => props.navigation.pop())
	};

	const selectFile = async () => {
		// Opening Document Picker to select one file
		try {
			const res = await DocumentPicker.pick({
				type: [DocumentPicker.types.allFiles],
			});

			setData({ ...data, image: res });
		} catch (err) {
			// Handling any exception (If any)
			if (DocumentPicker.isCancel(err)) {
				// If user canceled the document selection
				alert('Canceled');
			} else {
				// For Unknown Error
				alert('Unknown Error: ' + JSON.stringify(err));
				throw err;
			}
		}
	};
	return (
		<ScrollView
			style={{ margin: 30, marginTop: 10 }}
		>
			<TextInput
				style={inputStyle}
				placeholder="Name"
				onChangeText={(name) => { setData({ ...data, "name": name }) }}
			/>
			<TextInput
				style={inputStyle}
				placeholder="Latitude"
				onChangeText={(latitude) => { setData({ ...data, "latitude": latitude }) }}
			/>
			<TextInput
				style={inputStyle}
				placeholder="Longtitude"
				onChangeText={(longtitude) => { setData({ ...data, "longtitude": longtitude }) }}
			/>
			<View style={{ marginTop: 20, flexDirection: 'row' }}>
				<Text style={{ fontSize: 20, flex: 1 }}>
					{(data.image && data.image.name) || "None"}
				</Text>
				<Button
					textContent={'image'}
					buttonStyle={{ width: 100, height: 40, borderRadius: 10, marginLeft: 5 }}
					onPress={selectFile}
				/>
			</View>
			<Button
				textContent={'Submit'}
				onPress={() => { }}
				buttonStyle={{ alignSelf: 'center', marginTop: 20 }}
				textStyle={{ fontSize: 20 }}
				onPress={submit}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	mainBody: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	buttonStyle: {
		backgroundColor: '#307ecc',
		borderWidth: 0,
		color: '#FFFFFF',
		borderColor: '#307ecc',
		height: 40,
		alignItems: 'center',
		borderRadius: 30,
		marginLeft: 35,
		marginRight: 35,
		marginTop: 15,
	},
	buttonTextStyle: {
		color: '#FFFFFF',
		paddingVertical: 10,
		fontSize: 16,
	},
	textStyle: {
		backgroundColor: '#fff',
		fontSize: 15,
		marginTop: 16,
		marginLeft: 35,
		marginRight: 35,
		textAlign: 'center',
	},
});

export default CreateFarm;