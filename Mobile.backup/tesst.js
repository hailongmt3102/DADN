import React from 'react';
import 'react-native-gesture-handler';
import {Text} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

// import WelcomeScreen from './Src/Screen/welcome';
// import LoginScreen from './Src/Screen/login';
// import UserLoginScreen from './Src/Screen/userLogin';
// import AdminLoginScreen from './Src/Screen/adminLogin';
// import ForgotPassScreen from './Src/Screen/forgotPass';
// import HomePageScreen from './Src/Screen/homePage';
// import listFieldsScreen from './Src/Screen/listFields'
// import FieldPage from './Src/Screen/fieldPage'

// import { navigationRef } from './Src/Context/NavigationRoot';
// import { set_access_token, set_refresh_token, get_access_token, test, get_refresh_token } from './Src/Context/AsyncStorage'
// import SyncStorage from 'sync-storage';

// const Stack = createStackNavigator();

// const App = () => {

// 	set_refresh_token("")
// 	set_access_token("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyNDg2NzUwNDE1LCJqdGkiOiI5MzkxMWQ3ZjdhZmU0M2I4OGNkODdjZmE3MjNjYTg0ZCIsInVzZXJfaWQiOjF9.3O7tLsM66qsm_1rjpLZRdwEHr1h-0L2tYSDHzgmN3PI")
// 	set_refresh_token("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMzU4NjEzMSwianRpIjoiMTQ1YzAxNDUxYWRhNDZiMWJlY2ZiMTU4MWZmMWEwYzEiLCJ1c2VyX2lkIjoxfQ.29hgJuq5IECDQnctGn5XppXV6E9N2j8nSxIdwrGqdoM")
// 	return (

// 		<NavigationContainer
// 			ref={navigationRef}
// 		>
// 			<Stack.Navigator
// 				initialRouteName='ListFieldsScreen'
// 			>
// 				<Stack.Screen
// 					name="WelcomeScreen"
// 					component={WelcomeScreen}
// 					options={{ headerShown: false }}
// 				/>

// 				<Stack.Screen
// 					name="LoginScreen"
// 					component={LoginScreen}
// 					options={{ title: 'Đăng nhập', headerTitle: '' }}
// 				/>

// 				<Stack.Screen
// 					name="UserLoginScreen"
// 					component={UserLoginScreen}
// 					options={{ title: "Đăng nhập", headerTitle: '' }}
// 				/>

// 				<Stack.Screen
// 					name="AdminLoginScreen"
// 					component={AdminLoginScreen}
// 					options={{ title: "Đăng nhập", headerTitle: '' }}
// 				/>

// 				<Stack.Screen
// 					name="ForgotPassScreen"
// 					component={ForgotPassScreen}
// 					options={{ title: "Quên mật khẩu", headerTitle: '' }}
// 				/>

// 				<Stack.Screen
// 					name="HomePageScreen"
// 					component={HomePageScreen}
// 					options={{ title: "🌳   Xin chào !" }}
// 				/>

// 				<Stack.Screen
// 					name="ListFieldsScreen"
// 					component={listFieldsScreen}
// 					options={{ title: "🌳   Fields " }}
// 				/>

// 				<Stack.Screen
// 					name="fieldPage"
// 					component={FieldPage}
// 					options={{ title: "" }}
// 				/>
// 			</Stack.Navigator>
// 		</NavigationContainer>
// 	);
// }
const App = (props) => {
  return (<Text>Hello world</Text>)
}

export default App;