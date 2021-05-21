import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import WelcomeScreen from './src/screens/welcome';
import LoginScreen from './src/screens/login';
import UserLoginScreen from './src/screens/userLogin';
import AdminLoginScreen from './src/screens/adminLogin';
import ForgotPassScreen from './src/screens/forgotPass';

const Stack = createStackNavigator();


const App = () => {
  return(
    // <View>
    //   <Welcome></Welcome>
    // </View>
    // <welcome></welcome>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
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
          name="UserLogin"
          component={UserLoginScreen}
          options={{title:"Đăng nhập", headerTitle:''}}
        />

        <Stack.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
          options={{title:"Đăng nhập", headerTitle:''}}
        />

        <Stack.Screen
          name="ForgotPass"
          component={ForgotPassScreen}
          options={{title:"Quên mật khẩu", headerTitle:''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;