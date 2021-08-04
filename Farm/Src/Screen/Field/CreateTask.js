import React, { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	View,
	Platform,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Dimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackgroundTimer from 'react-native-background-timer';
import { ListItem } from 'react-native-elements';
import Context from '../../Context/Context';
import { validation } from '../../Context/MyTool';
import { ToggleField } from '../../Context/MyTool';
import { set_mem } from '../../Context/AsyncStorage';
import Button from '../../Component/Button';
const styles = StyleSheet.create({
	button: {
		flex: 1,
		borderRadius: 20,
		height: 40,
		width: 150,
		backgroundColor: '#9A79FE',
		justifyContent: 'space-evenly',
		margin: "auto",
		alignSelf: "center",
		alignItems: "center",
		textAlign: 'center',
		flexDirection: 'row',

	},
	text_input: {
		height: 40,
		width: 300,
		alignSelf: 'center',
		fontSize: 18,
		borderBottomWidth: 2,
		borderColor: '#000',
		marginTop: 20
	}
})

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CreateTask(props) {
	const fieldUUID = props.fieldUUID || (props.route && props.route.params.fieldUUID)

	// const field_id = 1
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [duration, setDurantion] = useState()
	const [show, setShow] = useState(false);


	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(false);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	const handleAddTask = () => {
		console.log(duration)
		if (date.getTime() < new Date().getTime())
			alert("invalid date time")
		else if (!duration){
			alert("please input duration")
		}
		else {
			const _duration = parseInt(duration)
			const time_diff = date.getTime() - new Date().getTime()

			setTasks([
				...tasks,
				[
					{
						time_stamp: date.getTime(),
						fieldUUID: fieldUUID,
						duration: _duration,
					},
					[
						BackgroundTimer.setTimeout(() => {
							ToggleField(fieldUUID, true)
						}, time_diff),
						BackgroundTimer.setTimeout(() => {
							ToggleField(fieldUUID, false)
						}, time_diff + (_duration * 60000)),
					]
				]
			])
			alert("timer added")
			set_mem("schedule_task", JSON.stringify({
				tasks: [
					tasks.map((task, key) => task[0])
				]
			}))
			props.navigation.pop()
		}
	}

	const [tasks, setTasks] = useContext(Context)
	return (
		<ScrollView style={{
		
		}}
		>
			<View>
				<ListItem bottomDivider>
					<ListItem.Title style={{ flex: 1 }}>
						{date.toDateString()}
					</ListItem.Title>
					<ListItem.Subtitle>
						<Button
							onPress={showDatepicker}
							textContent={'Adjust date'}
						/>


					</ListItem.Subtitle>
				</ListItem>
				<ListItem bottomDivider>
					<ListItem.Title style={{ flex: 1 }} >
						{date.getHours().toString() + ":" + date.getMinutes().toString()}
					</ListItem.Title>
					<ListItem.Subtitle >
						<TouchableOpacity
							onPress={showTimepicker}
							style={styles.button}
						>
							<Text>{"Adjust time"}</Text>
						</TouchableOpacity>

					</ListItem.Subtitle>
				</ListItem>
				<TextInput
					style={
						styles.text_input
					}
					placeholder="Duration"
					value={duration}
					onChangeText={(v) => {
						if (v) {

							if (validation.isInteger(v))
								setDurantion(v)
							else {
								alert("input integer only")
								setDurantion(duration)
							}
						}
						else setDurantion(null)


					}}
				/>
				<Button
					onPress={handleAddTask}
					textContent={"Add"}
					buttonStyle={{alignSelf:'center',marginTop:10}}
				/>
				<View>
					{show && (
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode={mode}
							is24Hour={true}
							display="default"
							onChange={onChange}
						/>
					)}
				</View>
			</View>
		</ScrollView>

	);
};


