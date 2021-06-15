import React from 'react';
import { View, Image, Text, Button, TouchableHighlight } from 'react-native';
// import styles
import styles from '../assets/styles/st_welcome';
const img = require('../assets/images/Login.png');

const login = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Image
        style={styles.WelcomeLogo}
        source={img}
      />
      <View
        style={styles.content}
      >
        <Text
          style={styles.text_title}
        >
          Tham gia Smart Farm với vai trò
        </Text>
        
        <TouchableHighlight
          style={styles.button}
          onPress={()=>{navigation.push('UserLoginScreen')}}
        >
          <Text
            style={styles.text_content}
          >Người dùng</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={()=>{navigation.push('AdminLoginScreen')}}
        >
          <Text
            style={styles.text_content}
          >Admin</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
};

export default login