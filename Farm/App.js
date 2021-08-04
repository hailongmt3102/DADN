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
	stack_navigation_ref,
} from './Src/Context/NavigationRoot';

import { get_mem,set_mem } from './Src/Context/AsyncStorage';

import Context from './Src/Context/Context';
// import SyncStorage from 'sync-storage';

import DrawerContent from "./Src/Component/DrawerContent"
import ScreensStack from './Src/Screen/ScreenStack';
const Drawer = createDrawerNavigator();



const App = () => {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		get_mem("schedule_task").then(data => {
			if (data)
				return JSON.parse(data).tasks
			return []
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
