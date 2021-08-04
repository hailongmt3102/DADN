import React, { useContext, createContext, useState, createElement } from 'react';
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

import Home from './Home'
import Login from './User/Login';
import Header from "../Component/Header"
import SignUp from './User/SignUp';
import CreateFarm from './Farm/CreateFarm';
import Farm from './Farm/Farm';
import ProductionInfo from './Production/ProductionInfo';
import CreateFeed from './Feed/CreateFeed';
import UpdateFeed from './Feed/UpdateFeed';
import Feed from './Feed/Feed';
import FieldsList from './Field/FieldsList';
import Field from './Field/Field';
import CreateSensor from './Sensor/CreateSensor';
import DataInfo from './Data/DataInfo';
import CreateField from './Field/CreateField';
import Crop from './Crop/Crop';
import CreateCrop from './Crop/CreateCrop';
import CreateTask from './Field/CreateTask';

const Stack = createStackNavigator();
export default function ScreensStack(props) {
	
	return (
		// <NavigationContainer ref={stack_navigation_ref} >
		<Stack.Navigator initialRouteName='Home'>

			<Stack.Screen
				name="Home"
				component={Home}
				options={{
					headerTitle: _props => <Header {...props} label="Home" />
				}}
			/>

			<Stack.Screen
				name="Field"
				component={Field}
				options={{
					headerTitle: _props => <Header {...props} label="Field" />
				}}
			/>

			<Stack.Screen
				name="CreateCrop"
				component={CreateCrop}
				options={{
					headerTitle: _props => <Header {...props} label="Create Crop" />
				}}
			/>

			<Stack.Screen
				name="CreateTask"
				component={CreateTask}
				options={{
					headerTitle: _props => <Header {...props} label="Create Task" />
				}}
			/>

			<Stack.Screen
				name="CreateField"
				component={CreateField}
				options={{
					headerTitle: _props => <Header {...props} label="Create Field" />
				}}
			/>

			<Stack.Screen
				name="Crop"
				component={Crop}
				options={{
					headerTitle: _props => <Header {...props} label="Crop" />
				}}
			/>

			<Stack.Screen
				name="DataInfo"
				component={DataInfo}
				options={{
					headerTitle: _props => <Header {...props} label="Data" />
				}}
			/>

			<Stack.Screen
				name="CreateSensor"
				component={CreateSensor}
				options={{
					headerTitle: _props => <Header {...props} label="Create Sensor" />
				}}
			/>

			<Stack.Screen
				name="Farm"
				component={Farm}
				options={{
					headerTitle: _props => <Header {...props} label="Farm" />
				}}
			/>

			<Stack.Screen
				name="FieldsList"
				component={FieldsList}
				options={{
					headerTitle: _props => <Header {...props} label="Fields" />
				}}
			/>

			<Stack.Screen
				name="Feed"
				component={Feed}
				options={{
					headerTitle: _props => <Header {...props} label="Feed" />
				}}
			/>

			<Stack.Screen
				name="CreateFeed"
				component={CreateFeed}
				options={{
					headerTitle: _props => <Header {...props} label="Create Feed" />
				}}
			/>

			<Stack.Screen
				name="UpdateFeed"
				component={UpdateFeed}
				options={{
					headerTitle: _props => <Header {...props} label="Update Feed" />
				}}
			/>

			<Stack.Screen
				name="ProductionInfo"
				component={ProductionInfo}
				options={{
					headerTitle: _props => <Header {...props} label="Production" />
				}}
			/>

			<Stack.Screen
				name="CreateFarm"
				component={CreateFarm}
				options={{
					headerTitle: _props => <Header {...props} label="Create farm" />
				}}
			/>

			<Stack.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }}
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
