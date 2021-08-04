import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TextInput
} from 'react-native';
import axiosInstance from "../../Context/Axios"

import Button from '../../Component/Button';

export default function CreateFeed(props) {
    const {farmUUID} = props.route.params 
    const [submit_data, set_submit_data] = useState({
        farm:farmUUID,
        username: "",
        key: ""
    })


    const handleSubmit = () => {
        axiosInstance.post("api/farms/feeds/create", submit_data)
            .then(resp => resp.data)
            .then(data => {
                props.navigation.pop()
            })
    } 

    return (
        <SafeAreaView>
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Username (adafruit)"
                value={submit_data["feed_username"]}
                onChangeText={(v) => {
                    set_submit_data({ ...submit_data, "username": v })
                }}
            />
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Key"
                onChangeText={(v) => { set_submit_data({ ...submit_data, "key": v }) }}
            />


            <Button
                textContent={'Submit'}
                onPress={handleSubmit}
                buttonStyle={{ alignSelf: 'center', marginTop: 20 }}
                textStyle={{ fontSize: 20 }}
            />

        </SafeAreaView>
    );


}


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const styles = StyleSheet.create({
    container: {
        color: 'white',
        backgroundColor: '#333',
    },
    text_input: {
        height: 40,
        width: 300,
        alignSelf: 'center',
        fontSize: 18,
        borderBottomWidth: 2,
        borderColor: '#000',
        marginTop: 20
    }
});
