import React, { useState, useEffect } from 'react';
import { Switch, View, Image, Text, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axiosInstance, { baseURL } from "../../Context/Axios";
import { stack_navigate } from '../../Context/NavigationRoot';
import { get_access_token } from '../../Context/AsyncStorage';
import axios from 'axios';
import { ListItem, Avatar } from 'react-native-elements';
import { key_set, shorternstr, short_date } from "../../Context/MyTool"
import userLogin from '../userLogin';
// import styles from '../../assets/styles/st_login';
const FieldDetail = (props) => {
    
    const field_id = props.field_id
    const [data, setData] = useState({})

    const get_data = () => {
        (axiosInstance.get("/api/field/" + field_id.toString() + "/").then(resp => {
            setData(resp.data)
        }))
    }

    useEffect(() => {
        if (!data["id"]) {
            get_data()
        }
    })

    let valid_set = [
        "field_location_index",
        "field_create_at",
        "area_length",
        "area_width",
        "area",
        "is_relay_on",
        "air_humidity",
        "air_temperature",
        "ground_humidity",
        "record_time",
    ]
    if (data["id"]) {
        return (
            <ScrollView>
                <View
                    style={[styles.container, { width: "100%" }]}

                >

                    {

                        valid_set.map((key, index) => {
                            let _key = key_set[key]
                            let value
                            if (key == "area") {
                                _key = "AREA"
                                value = data["area_length"] * data["area_width"]
                            }
                            else
                                value = data[key]
                            return (
                                <ListItem key={index} bottomDivider>
                                    <ListItem.Title style={styles.data_title}>{_key}</ListItem.Title>
                                    {
                                        key !== "is_relay_on" ?
                                            (
                                                <ListItem.Subtitle>
                                                    {(["field_create_at", "record_time"].indexOf(key) == -1) ? shorternstr(value) : short_date(value)}
                                                </ListItem.Subtitle>)
                                            :
                                            (
                                                < ListItem.Subtitle >
                                                    <Switch
                                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                        thumbColor={data["is_relay_on"] ? "#f5dd4b" : "#f4f3f4"}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={() => {
                                                            axiosInstance.post(
                                                                "/api/field/" + data["id"] + "/toggle/",
                                                                {
                                                                    "relay": !data["is_relay_on"]
                                                                }
                                                            ).then(
                                                                resp => resp.data
                                                            ).then(resp_data => {
                                                                let temp_data = { ...data }
                                                                temp_data["is_relay_on"] = resp_data["is_relay_on"]

                                                                setData(temp_data)
                                                            })
                                                            let temp_data = { ...data }
                                                            temp_data["is_relay_on"] = !data["is_relay_on"]

                                                            setData(temp_data)
                                                        }}
                                                        value={data["is_relay_on"]
                                                        }


                                                    />
                                                </ListItem.Subtitle>
                                            )
                                    }
                                </ListItem>)
                        })

                    }



                </View>
            </ScrollView >
        )
    }
    else return (<View><Text>loading</Text></View>)
}


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: '#FBFDFE',
        width: width,

    },
    data_container: {

    },
    data_title: {
        flex: 1, flexDirection: "row",
        alignItems: "center"
    },
    data_value: {

    },
    button_container:{
        
    }

})

export default FieldDetail;