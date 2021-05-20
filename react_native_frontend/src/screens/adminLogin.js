import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, SafeAreaView, TextInput, TouchableHighlight } from 'react-native';

import styles from '../styles/st_login';

const adminLogin = () =>{
  return(
    <SafeAreaView>
      <Text style={styles.title}>
        Admin
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

    </SafeAreaView>
  );
}

export default adminLogin;
