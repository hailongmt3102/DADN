// import React from 'react';
// import 'react-native-gesture-handler';
// import { Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import {
// 	createStackNavigator,
// 	HeaderTitle
// } from '@react-navigation/stack';

// import {
// 	createDrawerNavigator
// } from '@react-navigation/drawer';

// import {
// 	SafeAreaView
// } from 'react-native-safe-area-context';



// import {
// 	stack_navigation_ref,
// 	// drawer_navigation
// } from './Src/Context/NavigationRoot';

// import {
// 	set_access_token,
// 	set_refresh_token,
// 	get_access_token,
// 	get_refresh_token
// } from './Src/Context/AsyncStorage'



// import LoginScreen from './Src/Screen/login';
// import UserLoginScreen from './Src/Screen/userLogin';
// import AdminLoginScreen from './Src/Screen/adminLogin';
// import ForgotPassScreen from './Src/Screen/forgotPass';
// import HomePageScreen from './Src/Screen/homePage';
// import listFieldsScreen from './Src/Screen/listFields'
// import FieldPage from './Src/Screen/fieldPage'

// // import SyncStorage from 'sync-storage';

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// const MyHeader = (props) => {
// 	// console.log("props props",props)
// 	const { child } = props
// 	return <Text>hello</Text>
// }

// const App = () => {

// 	return (
// 		<NavigationContainer
// 			ref={stack_navigation_ref}
// 		>
// 			<Stack.Navigator
// 				initialRouteName='ListFieldsScreen'
// 				// screenOptions={{
// 				// 	headerStyle: {
// 				// 		shadowOffset: 0, shadowRadius: 0,
// 				// 		borderWidth: 0, borderBottomWidth: 0,
// 				// 		borderEndWidth: 0, borderLeftWidth: 0,
// 				// 		shadowColor: "white", shadowOffset: {
// 				// 			width: 0, height: 0
// 				// 		}
// 				// 	}
// 				// }}

// 			>


// 				<Stack.Screen
// 					name="LoginScreen"
// 					component={LoginScreen}
// 					options={{ headerShown: false }}
// 				/>

// 				<Stack.Screen
// 					name="UserLoginScreen"
// 					component={UserLoginScreen}
// 					options={{ headerShown: false }}
// 				/>

				

// 				{/* <Stack.Screen
// 					name="ForgotPassScreen"
// 					component={ForgotPassScreen}
// 					options={{ title: "Quên mật khẩu", headerTitle: '' }}
// 				/> */}

// 				<Stack.Screen
// 					name="HomePageScreen"
// 					component={HomePageScreen}
// 					options={{ title: "🌳   Xin chào !" }}
// 				/>

// 				<Stack.Screen
// 					name="ListFieldsScreen"
// 					component={listFieldsScreen}
// 					options={{}}
// 				/>

// 				<Stack.Screen
// 					name="fieldPage"
// 					component={FieldPage}
// 					options={{
// 						headerTitle: props => <MyHeader {...props} />
// 					}}
// 				/>
// 			</Stack.Navigator>
// 		</NavigationContainer>

// 	);
// }


// export default App;
