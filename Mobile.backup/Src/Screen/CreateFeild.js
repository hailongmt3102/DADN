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





export default function CreateField(props) {
    const [submit_data, set_submit_data] = useState({
        "field_location_index":"",
        "field_area_length":"",
        "field_area_width":"",
    })

    return (
        <SafeAreaView>
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Field no."
                value={submit_data["field_location_index"]}
                onChangeText={(v) => { 
                    
                    set_submit_data({ ...submit_data, "device_feed_name": feed_name }) 
                }}
            />
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Length"
                value={submit_data["field_area_length"]}
                onChangeText={(v) => { set_submit_data({ ...submit_data, "device_feed_name": feed_name }) }}
            />
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Width"
                value={submit_data["field_area_width"]}
                onChangeText={(v) => { 

                    set_submit_data({ ...submit_data, "device_feed_name": feed_name }) 
                }}
            />


            <CenterButton
                action={() => {
                    (axiosInstance.post("api/device/create/", submit_data
                    ).then(resp => resp.data).
                        then(data => {
                            alert("added device id: " + data["device_id"].toString())
                        }))
                }}
                text={"Submit"}
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
