import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TextInput
} from 'react-native';
import axiosInstance from "../../Context/Axios"

import Button from '../../Component/Button';

export default function UpdateFeed(props) {
    const { farmUUID, feedUUID } = props.route.params
    const [displayData, setDisplayData] = useState({})
    const [submit_data, set_submit_data] = useState({
        uuid: feedUUID,
        farm: farmUUID,
    })


    const handleSubmit = () => {
        axiosInstance.post("api/farms/feeds/update", submit_data)
            .then(resp => resp.data)
            .then(data => {
                props.navigation.pop()
            })
    }

    useEffect(() => {
        axiosInstance.get("api/farms/feeds/get", { params: { uuid: feedUUID } })
            .then(resp => resp.data.data)
            .then(data => {
                set_submit_data({...data,...submit_data})
            })
    }, [])

    return (
        <SafeAreaView>
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Username (adafruit)"
                value={submit_data["username"]}
                onChangeText={(v) => {
                    set_submit_data({ ...submit_data, "username": v })
                }}
            />
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Key"
                value={submit_data["key"]}
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
