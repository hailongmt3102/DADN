import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableHighlight, ScrollView } from 'react-native';

import styles from '../../assets/styles/st_login';

import axiosInstane from '../../Context/Axios';

import { set_access_token, set_refresh_token } from '../../Context/AsyncStorage'

import { stack_navigate } from '../../Context/NavigationRoot';
import CenterButton from '../../Component/CenterButton';


function Login(props) {
	const [state, setState] = useState({
		email: '',
		password: ''
	})

	const onsubmit = async () => {

		axiosInstane
			.post('/api/user/auth/sign_in', state)
			.then(response => response.data)
			.then((response) => {

				set_access_token(response.data.access);

				set_refresh_token(response.data.refresh);

				axiosInstane.defaults.headers['Authorization'] =
					'Bearer ' + response.data.access;

				props.navigation.pop();

				props.navigation.push("Home");
				
			})


	}

	return (
		<ScrollView>
			<Text style={styles.title}>
				Log in
			</Text>
			<TextInput
				style={styles.text_input}
				placeholder="Email"
				value={state['email']}
				onChangeText={(password) => { setState({ ...state, 'email': password }) }}
			/>
			<TextInput
				style={styles.text_input}
				secureTextEntry={true}
				placeholder="Password"
				value={state['password']}
				onChangeText={(password) => { setState({ ...state, 'password': password }) }}
			/>
			<CenterButton
				action={onsubmit}
				text={"Sign in"}
				color={"#9A79FE"}
			/>


			<View>
				<Text style={styles.baseText}>
					Forget password ?  {" "}
					<Text style={styles.innerText}
						onPress={() => { stack_navigate('ForgotPassScreen', { ...props }) }}
					>
						reset password
					</Text>
				</Text>
			</View>
			<View>
				<Text style={[styles.innerText, { alignSelf: "center", fontSize: 20 }]}
					onPress={() => { stack_navigate('SignUp', { ...props }) }}
				>
					Sign up
				</Text>
			</View>
		</ScrollView>
	)
}


export default Login;
