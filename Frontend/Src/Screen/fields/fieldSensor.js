import React from 'react';
import axiosInstance, { baseURL } from "../../Context/Axios";
import  { stack_navigate, stack_navigatew } from "../../Context/NavigationRoot";
import {
    MyList
} from "../../Component/MyList"
import CenterButton from "../../Component/CenterButton"
const FieldSensors = (props) => {

    const { field_id } = props

    const get_data = (set_function) => {

        (axiosInstance.get(
            ("/api/device/field/" + field_id.toString())
        ).then(resp => {
            set_function(resp.data["device_of_field"])
        }))

    }

    const map_function = (data) => {
        return {
            title: (new String(data["device_feed_name"])).toUpperCase(),
            image: null,
            subtitle: null
        }
    }
    return (
        <>
            <MyList
                get_data={get_data}
                map_function={map_function}
            />
            <CenterButton
                action={() => {
                    stack_navigate("CreateSensor", {field_id :field_id})
                }}
                text={"Add sensor"}
                color={"red"}
            />
        </>

    )
}

export default FieldSensors;