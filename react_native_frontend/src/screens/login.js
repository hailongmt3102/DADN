import React from 'react';
import { View, Image, Text, Button, TouchableHighlight } from 'react-native';
// import styles
import styles from '../styles/st_welcome';
const img = require('../images/Login.png');

const login = () => {
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
        >
          <Text
            style={styles.text_content}
          >Người dùng</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
        >
          <Button
            title="Admin"
            onPress={()=>{}}
          />
        </TouchableHighlight>
      </View>
    </View>
  )
};

export default login