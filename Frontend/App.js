import React from 'react';
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



import {
	drawer_navigation_ref,
	stack_navigation_ref,
	// drawer_navigation
} from './Src/Context/NavigationRoot';

import {
	set_access_token,
	set_refresh_token,
	get_access_token,
	get_refresh_token
} from './Src/Context/AsyncStorage'



import LoginScreen from './Src/Screen/login';
import UserLoginScreen from './Src/Screen/userLogin';
import AdminLoginScreen from './Src/Screen/adminLogin';
import ForgotPassScreen from './Src/Screen/forgotPass';
import HomePageScreen from './Src/Screen/homePage';
import listFieldsScreen from './Src/Screen/listFields'
import FieldPage from './Src/Screen/fieldPage'
import CropPage from './Src/Screen/CropPage'
import ProductionDetail from './Src/Screen/ProductionDetail'
import DataDetail from './Src/Component/DataDetail'
import CreateCrop from './Src/Screen/CreateCrop'
import CreateSensor from './Src/Screen/CreateSensor'
// import SyncStorage from 'sync-storage';
import Header from "./Src/Component/Header"
import DrawerContent from "./Src/Component/DrawerContent"

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ScreensStack = (props) => {
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
		</Stack.Navigator>
		

	);
}
const App = () => {
	return (
		<NavigationContainer  ref={stack_navigation_ref} >
			<Drawer.Navigator drawerContent={_props => <DrawerContent {..._props}/>}>
				<Drawer.Screen name="Home" component={ScreensStack} />
			</Drawer.Navigator>
		</NavigationContainer>

	);
}


export default App;
