import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, SafeAreaView, TextInput, TouchableHighlight } from 'react-native';

import styles from '../styles/st_login';

const userLogin = () =>{
  return(
    <SafeAreaView>
      <Text style={styles.title}>
        Đăng nhập
      </Text>
      <TextInput
        style={styles.text_input}
        placeholder="Email"
      />
      <TextInput
        style={styles.text_input}
        placeholder="Mật khẩu"
      />
      <TouchableHighlight
        style={styles.button}
      >
        <Text style={styles.innerbtn}>
          Đăng nhập
        </Text>
      </TouchableHighlight>

      <View>
        <Text style={styles.baseText}>
          Quên mật khẩu ?  {" "} 
          <Text style={styles.innerText}
            onPress={()=>{}}
          >
          Lấy lại mật khẩu
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default userLogin;
