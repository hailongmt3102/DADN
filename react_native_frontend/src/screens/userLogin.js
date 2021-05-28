import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableHighlight, Alert } from 'react-native';

import styles from '../styles/st_login';

import axiosInstane from '../../axios';

import { set_access_token, set_refresh_token } from '.././AsyncStorage'
import * as NavigationRoot from '../NavigationRoot';


function userLogin({ navigation }) {


	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onsubmit = () => {
		axiosInstane
			.post('auth/token/', {
				email: email,
				password: password,
			})
			.then((response) => {
				console.log(response)
				console.log(response.data.access)
				console.log(response.data.refresh)
				set_access_token(response.data.access);
				set_refresh_token(response.data.refresh);
				axiosInstane.defaults.headers['Authorization'] =
					'JWT ' + response.data.access;
				NavigationRoot.navigate('HomePageScreen', {})
			})
			.catch((error) => {
				console.log(error);
				console.log("login fail")
				alert("Thông tin đăng nhập sai")
			})
	};

	return (
		<SafeAreaView>
			<Text style={styles.title}>
				Đăng nhập
    </Text>
			<TextInput
				style={styles.text_input}
				placeholder="Email"
				value={email}
				onChangeText={(val) => { setEmail(val) }}

			/>
			<TextInput
				value={password}
				style={styles.text_input}
				placeholder="Mật khẩu"
				onChangeText={(val) => { setPassword(val) }}
			/>
			<TouchableHighlight
				style={styles.button}
				onPress={onsubmit}
			>
				<Text style={styles.innerbtn}>
					Đăng nhập
      </Text>
			</TouchableHighlight>

			<View>
				<Text style={styles.baseText}>
					Quên mật khẩu ?  {" "}
					<Text style={styles.innerText}
						onPress={() => { navigation.push('ForgotPassScreen') }}
					>
						Lấy lại mật khẩu
        </Text>
				</Text>
			</View>
		</SafeAreaView>
	)
}


export default userLogin;
