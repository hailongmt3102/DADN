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


const type_options = [
    {
        type_name: "soild",
        id: 0
    },
    {
        type_name: "tem-humid",
        id: 1
    },
    {
        type_name: "water relay",
        id: 2
    },
]


export default function CreateSensor(props) {

    const { field_id } = props.route.params

    const [options, setOptions] = useState()
    const [is_loaded, setLoaded] = useState(false)
    const [first_load, setFirstLoad] = useState(false)
    const [submit_data, set_submit_data] = useState()

    const get_options = () => {
        (axiosInstance.get(
            "/api/device/feed/"
        ).then(resp => {
            setOptions(resp.data)
        }))
    }

    useEffect(() => {
        setFirstLoad(!first_load)
    }, [])
    useEffect(() => {
        if (first_load)
            get_options()
    }, [first_load])
    useEffect(() => {
        if (first_load)
            setLoaded(!is_loaded)
    }, [options])

    if (is_loaded) {
        if (submit_data == null && options.length !== 0)
            set_submit_data({
                "device_field": field_id,
                "device_type": 0,
                "device_feed": options["0"]["id"],
                "is_my_device": false,
                "device_feed_name": ""
            })

        if (submit_data != null)
            return (
                <SafeAreaView>
                    <View
                        style={{ borderBottomWidth: 2, margin: 20 }}
                    >
                        <Text style={{ fontSize: 20 }}>Plant</Text>

                        <Picker
                            mode="dialog"
                            style={{ width: width * 2 / 3, alignSelf: "center" }}
                            numberOfLines={5}
                            selectedValue={submit_data["device_type"]}
                            onValueChange={(v) => set_submit_data({ ...submit_data, "device_type": v })}
                            prompt="Pick a sensor type"
                        >
                            {
                                type_options.map((entrie, index) => {
                                    return (<Item
                                        key={"type" + index.toString()}
                                        label={entrie["type_name"]}
                                        value={entrie["id"]}
                                    />)
                                }
                                )
                            }

                        </Picker>
                    </View>
                    <View
                        style={{ borderBottomWidth: 2, margin: 20 }}
                    >
                        <Text style={{ fontSize: 20 }}>Feed</Text>

                        <Picker
                            mode="dialog"
                            style={{ width: width * 2 / 3, alignSelf: "center" }}
                            numberOfLines={5}
                            selectedValue={submit_data["device_feed"]}
                            onValueChange={(v) => set_submit_data({ ...submit_data, "device_feed": v })}
                            prompt="Pick a feed"
                        >
                            {
                                options.map((entrie, index) => {
                                    return (<Item
                                        key={"type" + index.toString()}
                                        label={entrie["feed_username"]}
                                        value={entrie["id"]}
                                    />)
                                }
                                )
                            }

                        </Picker>
                    </View>

                    <TextInput
                        style={{
                            height: 40,
                            width: 300,
                            alignSelf: 'center',
                            fontSize: 18,
                            borderBottomWidth: 2,
                            borderColor: '#000',
                            marginTop: 20
                        }}
                        placeholder="Feed name"
                        onChangeText={(feed_name) => { set_submit_data({ ...submit_data, "device_feed_name": feed_name }) }}
                    />

                    <View
                        style={{ flexDirection: "row", margin: 20, justifyContent: "center" }}
                    >

                        <CheckBox
                            style={{ alignSelf: "center" }}
                            disabled={false}
                            value={submit_data["is_my_device"]}
                            onValueChange={(newValue) => set_submit_data({ ...submit_data, "is_my_device": newValue })}
                        />
                        <Text style={{ fontSize: 20 }}>Is customm device</Text>

                    </View>
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
    else return <></>
}


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const styles = StyleSheet.create({
    container: {
        color: 'white',
        backgroundColor: '#333',
    },
});
