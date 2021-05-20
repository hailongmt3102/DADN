import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, SafeAreaView, TextInput, TouchableHighlight } from 'react-native';

import styles from '../styles/st_login';

const login1 = () =>{
  return(
    <SafeAreaView>
      <Text style={styles.title}>
        Quên mật khẩu
      </Text>
      <TextInput
        style={styles.text_input}
        placeholder="Nhập email/ SDT đã đăng kí"
      />
      <TouchableHighlight
        style={styles.button}
      >
        <Text style={styles.innerbtn}>
          Tạo mật khẩu mới
        </Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

export default login1;
