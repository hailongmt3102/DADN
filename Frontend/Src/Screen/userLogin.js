import React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableHighlight, Alert } from 'react-native';

import styles from '../assets/styles/st_login';

import axiosInstane from '../Context/Axios';

import { set_access_token, set_refresh_token } from '../Context/AsyncStorage'

import { stack_navigate } from '../Context/NavigationRoot';

function userLogin({ navigation }) {
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
    <SafeAreaView>
      <Text style={styles.title}>
        Đăng nhập
    </Text>
      <TextInput
        style={styles.text_input}
        placeholder="Email"
        onChangeText={(email) => { formInfo.email = email }}
      />
      <TextInput
        style={styles.text_input}
        placeholder="Mật khẩu"
        onChangeText={(password) => { formInfo.password = password }}
      />
      <TouchableHighlight
        style={styles.button}
        onPress={onsubmit}
      >
        <Text style={styles.innerbtn}>
          Đăng nhập
      </Text>
      </TouchableHighlight>

      <View>
        <Text style={styles.baseText}>
          Quên mật khẩu ?  {" "}
          <Text style={styles.innerText}
            onPress={() => { stack_navigate('ForgotPassScreen', {}) }}
          >
            Lấy lại mật khẩu
        </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}


export default userLogin;
