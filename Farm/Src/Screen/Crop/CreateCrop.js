import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axiosInstance from "../../Context/Axios"
import Button from "../../Component/Button"
import {stack_navigate} from "../../Context/NavigationRoot"
import { set } from 'react-native-reanimated';
import axios from 'axios';
const Item = Picker.Item;



export default function CreateCrop(props) {
    const { fieldUUID } = props.route.params
    const [options, setOptions] = useState()
    const [submitData, setSubmitData] = useState(
        {
            field :fieldUUID,
        }
    )

    const getOptions = async () => {

        const data = await axiosInstance.get("/api/productions/matrix")
        .then(resp => {
            return resp.data.data
        })
        setOptions( data)
    }

    useEffect(() => {
        getOptions()
    }, [])

    const handleSubmit = async () => {
        axiosInstance.post('/api/farms/fields/crops/create',submitData).then(
            data => props.navigation.pop()
        )
    }

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
                        selectedValue={submitData.production}
                        onValueChange={(v) => setSubmitData({...submitData,production:v})}
                        prompt="Pick a production"
                    >
                        {
                            options && options.map((entrie, index) => {
                                return (<Item
                                    key={entrie["uuid"]}
                                    label={entrie["name"]}
                                    value={entrie["uuid"]}
                                />)
                            }
                            )
                        }

                    </Picker>
                </View>
                <Button
                    onPress={handleSubmit}
                    textContent={"Submit"}
                    buttonStyle={{alignSelf:'center'}}
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
});
