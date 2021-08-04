import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import styles from '../../assets/styles/st_login';
import CenterButton from '../../Component/CenterButton';

import axiosInstane from '../../Context/Axios';


import { stack_navigate } from '../../Context/NavigationRoot';

function SignUp(props) {
    const [signup, setSignup] = useState({
        email: "",
        password: "",
        username: "",
    })

    const onsubmit = () => {
        axiosInstane
            .post('auth/create/', signup)
            .then((response) => {
                alert("Successful sign-up")
                stack_navigate('userLogin', { ...props })
            })

    }

    return (

        <ScrollView>
            <Text style={styles.title}>
                SIGN UP
            </Text>
            <TextInput
                style={styles.text_input}
                placeholder="Email"
                onChangeText={(email) => { setSignup({ ...signup, email: email }) }}
            />
            <TextInput
                style={styles.text_input}
                placeholder="Username"
                onChangeText={(username) => { setSignup({ ...signup, username: username }) }}
            />
            <TextInput
                style={styles.text_input}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={(password) => { setSignup({ ...signup, password: password }) }}
            />
            <CenterButton
                action={onsubmit}
                text={"Sign up"}
                color={"#9A79FE"}
            />
            <TouchableOpacity>

                <Text style={[styles.innerText, { alignSelf: "center", fontSize: 20 }]}
                    onPress={() => { stack_navigate('UserLoginScreen', {}) }}
                >
                    log in
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}


export default SignUp;
