import React, { useContext, createContext, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	HeaderTitle
} from '@react-navigation/stack';

import {
	createDrawerNavigator
} from '@react-navigation/drawer';

import {
	SafeAreaView
} from 'react-native-safe-area-context';

import Context from './Src/Context/Context';


import {
	drawer_navigation_ref,
	stack_navigation_ref,
	// drawer_navigation
} from './Src/Context/NavigationRoot';

import {
	set_access_token,
	set_refresh_token,
	get_access_token,
	get_refresh_token,
	get_mem,
	set_mem
} from './Src/Context/AsyncStorage'


// import SyncStorage from 'sync-storage';

import DrawerContent from "./Src/Component/DrawerContent"
import BackgroundTimer from 'react-native-background-timer';
import ScreensStack from './Src/Screen/ScreenStack';
import { ToggleField } from './Src/Context/MyTool';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();




const App = () => {
	const [tasks, setTasks] = useState([])


	useEffect(() => {
		get_mem("schedule_task").then(data => {
			return JSON.parse(data).tasks
		}).then(tasks => {
			const task_holder = []
			tasks.map((task, index) => {
				const time_stamp = new Date(task.time_stamp)
				const time_diff = time_stamp.getTime() - new Date().getTime()
				if (time_diff > 0)
					task_holder.push([task, [
						BackgroundTimer.setTimeout(() => {
							ToggleField(task.field_id, true)
						}, time_diff),
						BackgroundTimer.setTimeout(() => {
							ToggleField(task.field_id, false)
						}, time_diff + (task.duration * 60000)),
					]])
			})
			setTasks(task_holder)
		})
	}, [])

	return (
		<Context.Provider value={[tasks, setTasks]}>
			<NavigationContainer ref={stack_navigation_ref} >
				<Drawer.Navigator drawerContent={_props => <DrawerContent {..._props} />}>
					<Drawer.Screen name="Home" component={ScreensStack} />
				</Drawer.Navigator>
			</NavigationContainer>
		</Context.Provider>


	);
}


export default App;
