import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import Welcome from './src/screens/welcome';
import Login from './src/screens/login';
const App = () => {
  return(
    <View>
      <Login/>
    </View>
  );
}

export default App;