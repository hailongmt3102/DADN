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

import {navigationRef} from './src/NavigationRoot';


const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer
      ref={navigationRef}
    >
      <Stack.Navigator
        initialRouteName='WelcomeScreen'
      >
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown:false}}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{title:'Đăng nhập', headerTitle:''}}
        />

        <Stack.Screen
          name="UserLoginScreen"
          component={UserLoginScreen}
          options={{title:"Đăng nhập", headerTitle:''}}
        />

        <Stack.Screen
          name="AdminLoginScreen"
          component={AdminLoginScreen}
          options={{title:"Đăng nhập", headerTitle:''}}
        />

        <Stack.Screen
          name="ForgotPassScreen"
          component={ForgotPassScreen}
          options={{title:"Quên mật khẩu", headerTitle:''}}
        />

        <Stack.Screen
          name="HomePageScreen"
          component={HomePageScreen}
          options={{title:"🌳   Xin chào !"}}
        />

        <Stack.Screen
          name="ListFieldsScreen"
          component={listFieldsScreen}
          options={{title:"🌳   Khu vực "}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;