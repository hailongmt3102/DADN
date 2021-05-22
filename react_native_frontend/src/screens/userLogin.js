import React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableHighlight } from 'react-native';

import styles from '../styles/st_login';

import axiosInstane from  '../../axios';

import {AsyncStorage} from '@react-native-community/async-storage';

function userLogin ({navigation}){
  const formInfo = {
    email:'',
    password:''
  }

  const onsubmit=()=>{
    axiosInstane
    .post('auth/token/',{
      email:formInfo.email,
      password:formInfo.password
    })
    .then((response) => {
      console.log(response);
      AsyncStorage.setItem('access_token', response.data.access);
      AsyncStorage.setItem('refresh_token', response.data.refresh);
      axiosInstane.defaults.header['Authorization'] = 
        'DADNJWT ' + AsyncStorage.getItem('access_token');
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return(
    <SafeAreaView>
    <Text style={styles.title}>
      Đăng nhập
    </Text>
    <TextInput
      style={styles.text_input}
      placeholder="Email"
      onChangeText={(email)=>{formInfo.email = email}}
    />
    <TextInput
      style={styles.text_input}
      placeholder="Mật khẩu"
      onChangeText={(password)=>{formInfo.password = password}}
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
          onPress={()=>{navigation.push('ForgotPass')}}
        >
        Lấy lại mật khẩu
        </Text>
      </Text>
    </View>
  </SafeAreaView>
  )
}


export default userLogin;
