import React from 'react';
import axiosInstance, { baseURL } from "../../Context/Axios";
import {
    MyList
} from "../../Component/MyList"
const DataList = (props) => {

    const { field_id } = props

    const get_data = (set_function) => {

        console.log(axiosInstance.get(
            ("/api/data/field/" + field_id.toString())
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
        <MyList
            get_data={get_data}
            map_function={map_function}
        /> 
   
    )
}

export default DataList;