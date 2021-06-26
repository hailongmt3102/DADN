import React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableHighlight, ScrollView } from 'react-native';

import styles from '../assets/styles/st_login';

import axiosInstane from '../Context/Axios';

import { set_access_token, set_refresh_token } from '../Context/AsyncStorage'

import { stack_navigate } from '../Context/NavigationRoot';
import CenterButton from '../Component/CenterButton';


function userLogin(props) {
  const formInfo = {
    email: '',
    password: ''
  }

  const onsubmit = () => {
    axiosInstane
      .post('auth/token/', {
        email: formInfo.email,
        password: formInfo.password
      })
      .then((response) => {
        set_access_token(response.data.access);
        set_refresh_token(response.data.refresh);
        axiosInstane.defaults.headers['Authorization'] =
          'JWT ' + response.data.access;
        stack_navigate("HomePageScreen", {})
      })

  }

  return (
    <ScrollView>
      <Text style={styles.title}>
        Log in
      </Text>
      <TextInput
        style={styles.text_input}
        placeholder="Email"
        onChangeText={(email) => { formInfo.email = email }}
      />
      <TextInput
        style={styles.text_input}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(password) => { formInfo.password = password }}
      />
      <CenterButton
        action={onsubmit}
        text={"Sign in"}
        color={"#9A79FE"}
      />


      <View>
        <Text style={styles.baseText}>
          Forget password ?  {" "}
          <Text style={styles.innerText}
            onPress={() => { stack_navigate('ForgotPassScreen', { ...props }) }}
          >
            reset password
          </Text>
        </Text>
      </View>
      <View>
        <Text style={[styles.innerText, { alignSelf: "center", fontSize: 20 }]}
          onPress={() => { stack_navigate('SignUp', { ...props }) }}
        >
          Đăng ký
        </Text>
      </View>
    </ScrollView>
  )
}


export default userLogin;
