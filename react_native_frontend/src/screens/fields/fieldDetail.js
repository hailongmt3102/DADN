import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView } from 'react-native';
import axiosInstance from '../../../axios';
import { ListItem, Avatar } from 'react-native-elements';
const FieldDetail = (props) => {
    const field_id = props.field_id
    const [data, setData] = useState({})
    console.log("/api/field/" + field_id)
    const get_data = () => {
        console.log(axiosInstance.get("/api/field/" + field_id.toString() + "/").then(resp => {
            setData(resp.data)
        }))
    }

    console.log(data)
    useEffect(() => {
        if (!data["id"]) {
            get_data()
        }
    })
    if (data["id"]) {
        return (
            <ScrollView>
                <View>

                    <ListItem topDivider bottomDivider>
                        <ListItem.Title>FIELD NO.</ListItem.Title>
                        <ListItem.Subtitle>{data["field_location_index"]}</ListItem.Subtitle>
                    </ListItem>
                    {/* <ListItem>
                        <ListItem.Title>{key_set[key]}</ListItem.Title>
                        <ListItem.Subtitle>{data[key]}</ListItem.Subtitle>
                    </ListItem>
                    <ListItem>
                        <ListItem.Title>{key_set[key]}</ListItem.Title>
                        <ListItem.Subtitle>{data[key]}</ListItem.Subtitle>
                    </ListItem>
                    <ListItem>
                        <ListItem.Title>{key_set[key]}</ListItem.Title>
                        <ListItem.Subtitle>{data[key]}</ListItem.Subtitle>
                    </ListItem>
                    <ListItem>
                        <ListItem.Title>{key_set[key]}</ListItem.Title>
                        <ListItem.Subtitle>{data[key]}</ListItem.Subtitle>
                    </ListItem> */}

                </View>
            </ScrollView>
        )
    }
    else return (<View><Text>loading</Text></View>)
}

export default FieldDetail;