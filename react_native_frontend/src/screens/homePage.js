import React from 'react';
import {View, Image, Text, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {navigate} from '../NavigationRoot';
import styles from '../styles/st_home';

const defaultImg = require('../images/imageDefault.png')

const tab = createMaterialTopTabNavigator();

function homePageScreen(){
  return(
    <tab.Navigator>
      <tab.Screen name="Nông trại" component={Your_fame}/>
      <tab.Screen name="Sản phẩm" component={Productions}/>
    </tab.Navigator>
  )
}

const Your_fame=() => {
  return(
    <SafeAreaView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={defaultImg}
          />
          <View
            style={styles.textline}
          >
            <Text
              style={styles.title}
            >
              Tên nông trại :{"    "} 
              <Text
                style={styles.text_content}
              >
                OIT Farm
              </Text>
            </Text> 
          </View>

          <View
            style={styles.textline}
          >
            <Text
              style={styles.title}
            >
              Ngày tạo        :{"    "} 
              <Text
                style={styles.text_content}
              >
                12/5/2021
              </Text>
            </Text> 
          </View>
          
          <TouchableHighlight
            style={styles.button}
            onPress={()=>{}}
          >
            <Text style={styles.innerbtn}>
              Cập nhật
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={navigate("ListFieldsScreen")}  
          >
            <Text style={styles.innerbtn}
            >
              Kiểm tra
            </Text>
          </TouchableHighlight>
        </View>
    </SafeAreaView>
  )

}

// get production from server .......
// TODO
const list = [
  {
    image:'../images/imageDefault.png',
    title:'Production name'
  },
  {
    image:'../images/imageDefault.png',
    title:'Production name'
  }
]

// TODO
const Productions=() => {
  return(
    <SafeAreaView>
        <View>  
          <Text>
            toto: make list here
          </Text>
        </View>
    </SafeAreaView>
  )
}



export default homePageScreen;