import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, SafeAreaView, TextInput, TouchableHighlight } from 'react-native';

import styles from '../styles/st_login';

import axiosInstane from  '../../axios';

class userLogin extends Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      checklogin:0
    }
  }
  onsubmit=()=>{
    // this.props.navigation.push('ForgotPass')
    axiosInstane
      .post('auth/token/',{
        email:this.state.email,
        password:this.state.password
      })
      .then((response) => response.json())
      .then((responseJson) =>{
        console.log(responseJson)
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  render(){
    const navigation = this.props.navigation;
    return(
      <SafeAreaView>
      <Text style={styles.title}>
        Đăng nhập
      </Text>
      <TextInput
        style={styles.text_input}
        placeholder="Email"
        onChangeText={(email)=>{this.state.email = email}}
      />
      <TextInput
        style={styles.text_input}
        placeholder="Mật khẩu"
        onChangeText={(password)=>{this.state.password = password}}
      />
      <TouchableHighlight
        style={styles.button}
        onPress={this.onsubmit}
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
}

export default userLogin;
