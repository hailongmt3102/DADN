import React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableHighlight, Alert } from 'react-native';

import styles from '../styles/st_login';

import axiosInstane from  '../../axios';

import {set_access_token, set_refresh_token} from '.././AsyncStorage' 

import {navigate} from '../NavigationRoot';

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
      set_access_token(response.data.access);
      set_refresh_token(response.data.refresh);
      axiosInstane.defaults.headers['Authorization'] = 
        'JWT ' + response.data.access;
      // login successfull
      // moving to home page
      navigate('HomePageScreen',{})
    })
    .catch((error)=>{
      console.log(error);
      console.log("login fail")
      // Alert.alert(
      //   "Báo lỗi",
      //   "Thông tin đăng nhập không hợp lệ",
      //   [
      //     {
      //       text: "Đóng",
      //       style: "cancel"
      //     }
      //   ]
      // )
      alert("Thông tin đăng nhập sai")
      // login fail 

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
          onPress={()=>{navigation.push('ForgotPassScreen')}}
        >
        Lấy lại mật khẩu
        </Text>
      </Text>
    </View>
  </SafeAreaView>
  )
}


export default userLogin;
