import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TextInput
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import { Picker } from '@react-native-picker/picker';
import axiosInstance from "../Context/Axios"
import CenterButton from "../Component/CenterButton"
import { stack_navigate } from "../Context/NavigationRoot"
import { set } from 'react-native-reanimated';
const Item = Picker.Item;


export default function EditDeleteFeed(props) {
    // console.log(props)
    const [submit_data, set_submit_data] = useState({
        feed_username: props.route.params.feed_username,
        feed_key: props.route.params.feed_key
    }
    )

    return (
        <SafeAreaView>
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Username (adafruit)"
                value={submit_data["feed_username"]}
                onChangeText={(v) => {
                    set_submit_data({ ...submit_data, "feed_username": v })
                }}
            />
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Key"
                value={submit_data["feed_key"]}
                onChangeText={(v) => { set_submit_data({ ...submit_data, "feed_key": v }) }}
            />


            <CenterButton
                action={() => {
                    (axiosInstance.put("api/device/feed/" + props.route.params.id.toString() + "/", submit_data
                    ).then(resp => resp.data).
                        then(data => {
                            props.navigation.pop()
                        }))
                }}
                text={"Submit"}
                color={"pink"}
            />
            <CenterButton
                action={() => {
                    (axiosInstance.delete("api/device/feed/" + props.route.params.id.toString() + "/")
                        .then(resp => resp.data).
                        then(data => {
                            props.navigation.pop()
                        }))
                }}
                text={"Delete feed"}
                color={"red"}
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
