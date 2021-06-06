import React from 'react';
import { View, Text } from 'react-native';
import { date_of_date } from "../../Context/MyTool"
import { stack_navigate } from "../../Context/NavigationRoot"
import axiosInstance, { baseURL } from "../../Context/Axios";

import {
    MyList
} from "../../Component/MyList"
const FieldAllCrop = (props) => {

    const { field_id } = props

    const get_data = (set_function) => {

        (axiosInstance.get(
            ("/api/field/" + field_id.toString() + "/crops/")
        ).then(resp => {
            console.log("hello from aixos")
            set_function(resp.data["crops_of_field"])
        }))

    }
    const map_function = (data) => {
        return {
            title: (new String(data["crop_production"]["production_name"])).toUpperCase(),
            image: data["crop_production"]["production_image"],
            subtitle: date_of_date(data["crop_start_date"]),
            navigate_function : ()=>{stack_navigate("Crop", {crop_id : data["id"]})}
        }
    }
    return (
        <MyList
            get_data={get_data}
            map_function={map_function}
        /> 
    )
}

export default FieldAllCrop;