import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';

import styles from '../styles/st_welcome';
function welcome () {
  return(
    <View style={styles.container}>
      <Image
        style={styles.WelcomeLogo}
        source={require('../images/welcome.png')}
      />
      <View style={styles.content}>
        <Text style={styles.text_title}>
          Xin chào,
          {"\n\n"}
        </Text>
        <Text style={styles.text_content}>
          Chào mừng bạn đến với Smart Farm
        </Text>
      </View>
    </View>
  )
}
export default welcome;