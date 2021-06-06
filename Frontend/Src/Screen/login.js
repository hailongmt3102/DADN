import React from 'react';
import { View, Image, Dimensions, Text, Button, TouchableHighlight, StyleSheet } from 'react-native';
import { navigate_stack } from "../Context/NavigationRoot"
// import styles
// import styles from '../assets/styles/st_welcome';
const img = require('../assets/images/Login.png');

const login = ({ navigation }) => {
  return (
    <View style={styles.container}>


      <View style={styles.image_contaier}>
        <Image
          style={styles.WelcomeLogo}
          source={img}
        />
      </View>


      {/* <View style={styles.content}> */}

      <TouchableHighlight
        onPress={() => {
          console.log("press")
          navigate_stack("listFieldsScreen", {})
        }}
        style={styles.button}
      >
        <Text style={styles.text_content} >Log in</Text>
      </TouchableHighlight>




    </View>
  )
};
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#FBFDFE'
  },
  image_contaier: {
    height: 400,
    alignItems: "center",
    backgroundColor: 'red',
  },
  WelcomeLogo: {
    height: 400,
    resizeMode: 'contain',
  },
  content: {
    height: height * 1 / 3,
    backgroundColor: '#FBFDFE',
    // backgroundColor: 'red',
    fontFamily: 'Roboto',
  },
  text_title: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingLeft: 20,
  },
  text_content: {
    fontSize: 18,
  },
  text_welcome: {
    fontSize: 18,
    marginLeft: 20
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 200,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#9A79FE'
  }
});

export default login