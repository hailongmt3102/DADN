import React, { useContext, createContext, useState } from 'react';
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

import Context from '../Context/Context';


import {
	drawer_navigation_ref,
	stack_navigation_ref,
	// drawer_navigation
} from '../Context/NavigationRoot';

import {
	set_access_token,
	set_refresh_token,
	get_access_token,
	get_refresh_token,
	get_mem,
	set_mem
} from '../Context/AsyncStorage'

import LoginScreen from './login';
import UserLoginScreen from './userLogin';
import AdminLoginScreen from './adminLogin';
import ForgotPassScreen from './forgotPass';
import HomePageScreen from './homePage';
import listFieldsScreen from './listFields'
import FieldPage from './fieldPage'
import CropPage from './CropPage'
import ProductionDetail from './ProductionDetail'
import DataDetail from '../Component/DataDetail'
import CreateCrop from './CreateCrop'
import CreateSensor from './CreateSensor'
// import SyncStorage from 'sync-storage';
import Header from "../Component/Header"
import DrawerContent from "../Component/DrawerContent"
import ScheduleIrrigation from './ScheduleIrrigation';
import BackgroundTimer from 'react-native-background-timer';
import CreateTask from './AddTask';
import SignUp from './SignUp';
import EditDeleteFeed from './EditFeed';
import CreateFeed from './CreateFeed';
const Stack = createStackNavigator();
export default function ScreensStack(props) {
	return (
		// <NavigationContainer ref={stack_navigation_ref} >
		<Stack.Navigator initialRouteName='HomePageScreen'>
			<Stack.Screen
				name="CreateSensor"
				component={CreateSensor}
			/>
			<Stack.Screen
				name="CreateCrop"
				component={CreateCrop}
			/>

			<Stack.Screen
				name="DataDetail"
				component={DataDetail}
			/>

			<Stack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="UserLoginScreen"
				component={UserLoginScreen}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="ProductionDetail"
				component={ProductionDetail}
			/>

			<Stack.Screen
				name="HomePageScreen"
				component={HomePageScreen}
				options={{
					headerTitle: _props => <Header {..._props} {...props} label="Home" />
				}}
			/>

			<Stack.Screen
				name="Crop"
				component={CropPage}
				options={{
					headerTitle: _props => <Header {..._props} {...props} label="Crop" />
				}}
			/>

			<Stack.Screen
				name="ListFieldsScreen"
				component={listFieldsScreen}
				options={{
					headerTitle: _props => <Header {..._props} {...props} label="Fields" />
				}}
			/>

			<Stack.Screen
				name="fieldPage"
				component={FieldPage}
				options={{
					headerTitle: _props => <Header {..._props} {...props} label="Field" />
				}}
			/>

			<Stack.Screen
				name="ScheduleIrrigation"
				component={ScheduleIrrigation}
				options={{
					headerTitle: _props => <Header {..._props} {...props} label="Timer" />
				}}
			/>
			<Stack.Screen
				name="CreateTask"
				component={CreateTask}
				options={{
					headerTitle: _props => <Header {..._props} {...props} label="New timer" />
				}}
			/>

			<Stack.Screen
				name="EditDeleteFeed"
				component={EditDeleteFeed}
				options={{
					headerTitle: _props => <Header {..._props} {...props} label="Edit feed" />
				}}
			/>
			<Stack.Screen
				name="CreateFeed"
				component={CreateFeed}
				options={{
					headerTitle: _props => <Header {..._props} {...props} label="New feed" />
				}}
			/>

			<Stack.Screen
				name="SignUp"
				component={SignUp}
				options={{
					headerShown: false
				}}
			/>
		</Stack.Navigator>


	);
}
