import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TextInput
} from 'react-native';
import axiosInstance from "../../Context/Axios"

import Button from '../../Component/Button';

export default function CreateField(props) {
    const {farmUUID} = props.route.params 
    const [submit_data, set_submit_data] = useState({
        farm:farmUUID,
    })


    const handleSubmit = () => {
        axiosInstance.post("api/farms/fields/create", submit_data)
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
                placeholder="Field index"
                // value={submit_data["feed_username"]}
                onChangeText={(v) => {
                    set_submit_data({ ...submit_data, "location_index": v })
                }}
            />
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="width"
                onChangeText={(v) => { set_submit_data({ ...submit_data, "width": v }) }}
            />
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Height"
                onChangeText={(v) => { set_submit_data({ ...submit_data, "Height": v }) }}
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
