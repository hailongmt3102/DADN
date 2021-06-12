import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axiosInstance from "../Context/Axios"
import CenterButton from "../Component/CenterButton"
import {stack_navigate} from "../Context/NavigationRoot"
import { set } from 'react-native-reanimated';
const Item = Picker.Item;



export default function CreateCrop(props) {
    const { field_id } = props.route.params
    const [options, setOptions] = useState()
    const [is_loaded, setLoaded] = useState(false)
    const [first_load, setFirstLoad] = useState(false)


    const get_options = () => {
        (axiosInstance.get(
            "/api/production/"
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

    const [value, setValue] = useState();
    
    const submit_data = {
        "field_id": field_id,
        "production_id": value
    }

    if (is_loaded) {
        if (value == null && options.length !== 0)
            setValue(options["0"]["id"])
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
                        selectedValue={value}
                        onValueChange={(v) => setValue(v)}
                        prompt="Pick a production"
                    >
                        {
                            options.map((entrie, index) => {
                                return (<Item
                                    key={index}
                                    label={entrie["production_name"]}
                                    value={entrie["id"]}
                                />)
                            }
                            )
                        }

                    </Picker>
                </View>
                <CenterButton
                    action={() => {
                        console.log(axiosInstance.post("api/crop/create/", submit_data
                        ).then(resp => resp.data).
                            then(data => {
                                console.log(data)
                                stack_navigate("Crop", { crop_id: data["crop_id"] })
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
