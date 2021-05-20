import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import Welcome from './src/screens/welcome';
import Login1 from './src/screens/forgotPass';

const App = () => {
  return(
    <View>
      <Welcome/>
      {/* <Login1/> */}
    </View>
  );
}

export default App;