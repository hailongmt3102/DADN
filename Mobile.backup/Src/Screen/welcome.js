import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

import styles from '../assets/styles/st_welcome';

function welcome({ navigation }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.push('LoginScreen')}
			>
				<Image
					style={styles.WelcomeLogo}
					source={require('../assets/images/welcome.png')}
				/>
				<View style={styles.content}>
					<Text style={styles.text_title}>
						Xin chào,
            {"\n\n"}
					</Text>
					<Text style={styles.text_welcome}>
						Chào mừng bạn đến với Smart Farm
          </Text>
				</View>
			</TouchableOpacity>

		</View>
	)
}
export default welcome;