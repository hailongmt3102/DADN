import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import WelcomeScreen from './src/screens/welcome';
import LoginScreen from './src/screens/login';
import UserLoginScreen from './src/screens/userLogin';
import AdminLoginScreen from './src/screens/adminLogin';
import ForgotPassScreen from './src/screens/forgotPass';
import HomePageScreen from './src/screens/homePage';
import listFieldsScreen from './src/screens/listFields'

import { navigationRef } from './src/NavigationRoot';
import { set_access_token, set_refresh_token, get_access_token, test, get_refresh_token } from './src/AsyncStorage'
// import SyncStorage from 'sync-storage';

// SyncStorage.set('foo', 'bar');

// const result = SyncStorage.get('foo');
// console.log(result); // 'bar'

const Stack = createStackNavigator();

const App = () => {

	set_refresh_token("")
	set_access_token("")
	set_refresh_token("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMzU4NjEzMSwianRpIjoiMTQ1YzAxNDUxYWRhNDZiMWJlY2ZiMTU4MWZmMWEwYzEiLCJ1c2VyX2lkIjoxfQ.29hgJuq5IECDQnctGn5XppXV6E9N2j8nSxIdwrGqdoM")
	// set_access_token("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyNDg2MTUzMDkwLCJqdGkiOiIyNDY1MjJmNGEzNDE0YWM5YmJiYmNiNmFiMTUyMmFiMCIsInVzZXJfaWQiOjN9.9Kn04fwpJhZpOJsd7ke0sB8O2Br9pLVnyES2GwwHCaw")
	return (

		<NavigationContainer
			ref={navigationRef}
		>
			<Stack.Navigator
				initialRouteName='HomePageScreen'
			>
				<Stack.Screen
					name="WelcomeScreen"
					component={WelcomeScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
					options={{ title: 'Đăng nhập', headerTitle: '' }}
				/>

				<Stack.Screen
					name="UserLoginScreen"
					component={UserLoginScreen}
					options={{ title: "Đăng nhập", headerTitle: '' }}
				/>

				<Stack.Screen
					name="AdminLoginScreen"
					component={AdminLoginScreen}
					options={{ title: "Đăng nhập", headerTitle: '' }}
				/>

				<Stack.Screen
					name="ForgotPassScreen"
					component={ForgotPassScreen}
					options={{ title: "Quên mật khẩu", headerTitle: '' }}
				/>

				<Stack.Screen
					name="HomePageScreen"
					component={HomePageScreen}
					options={{ title: "🌳   Xin chào !" }}
				/>

				<Stack.Screen
					name="ListFieldsScreen"
					component={listFieldsScreen}
					options={{ title: "🌳   Khu vực " }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}


export default App;