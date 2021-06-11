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
// import SyncStorage from 'sync-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MyHeader = (props) => {
	// console.log("props props",props)
	const { child } = props
	return <Text>hello</Text>
}

const App = () => {
	set_access_token("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzMjk5MjA2LCJqdGkiOiIwYWI1ZmVkZGE2MDQ0YmE3Yjk1ZmI4MjZkYmRkMDAwZSIsInVzZXJfaWQiOjF9.WhaNuQbWn9ERfPR9lunPKNRbUn-YglrF5So-5iJuI3w")
	set_refresh_token("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyNDE2MzE0NiwianRpIjoiYjkyYjNkZWM5MGE0NDRkZWE1NzJjMDE5YjRmNGUxN2EiLCJ1c2VyX2lkIjoxfQ.EiKF1vMETspyQA4t0BEExtw62QhXajwmFMAuwW3cqVo")
	return (
		<NavigationContainer
			ref={stack_navigation_ref}
		>
			<Stack.Navigator
				initialRouteName='CreateCrop'
				// screenOptions={{
				// 	headerStyle: {
				// 		shadowOffset: 0, shadowRadius: 0,
				// 		borderWidth: 0, borderBottomWidth: 0,
				// 		borderEndWidth: 0, borderLeftWidth: 0,
				// 		shadowColor: "white", shadowOffset: {
				// 			width: 0, height: 0
				// 		}
				// 	}
				// }}

			>


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
					options={{ title: "🌳   Xin chào !" }}
				/>

				<Stack.Screen
					name="Crop"
					component={CropPage}
					options={{}}
				/>

				<Stack.Screen
					name="ListFieldsScreen"
					component={listFieldsScreen}
					options={{}}
				/>

				<Stack.Screen
					name="fieldPage"
					component={FieldPage}
					options={{
						headerTitle: props => <MyHeader {...props} />
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>

	);
}


export default App;
