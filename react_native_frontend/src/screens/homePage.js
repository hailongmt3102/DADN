import React from 'react';
import {View, Image, Text, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {navigate} from '../NavigationRoot';

const tab = createMaterialTopTabNavigator();

function homePageTab(){
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
            source={require('../images/imageDefault.png')}
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
            onPress={()=>{}}
          >
            <Text style={styles.innerbtn}>
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
            toto: make list her
          </Text>
        </View>
    </SafeAreaView>
  )
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FBFDFE',
    width:width,
    height:height
  },
  image:{
    height:300,
    resizeMode:'contain',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:50
  },
  textline:{
    margin:10,
    marginLeft:20
  },
  title:{
    fontWeight:'bold',
    fontSize:20,
  },
  text_content:{
    fontSize:20
  },
  button:{
    borderRadius:20,
    height:40,
    width:150,
    alignSelf:'center',
    backgroundColor:'#9A79FE',
    paddingLeft:20,
    paddingRight:20,
    marginTop:20,
    justifyContent:'center',
    textAlign:'center',
    flexDirection:'row'
  },
  innerbtn:{
    color:'#FFF',
    fontSize:18,
    alignSelf:'center'
  },
  production_item:{
    margin:20,
    backgroundColor:"FFFFFF"
  }
})

export default homePageTab;