import React from 'react';
import axiosInstance, { baseURL } from "../../Context/Axios";
import {
    MyList
} from "../../Component/MyList"
import {
    fulldate_of_date
} from "../../Context/MyTool"
import {
    stack_navigate
} from "../../Context/NavigationRoot"
const DataList = (props) => {

    const { crop_id } = props

    const get_data = (set_function) => {

        console.log(axiosInstance.get(
            ("/api/data/crop/" + crop_id.toString())
        ).then(resp => {
            set_function(resp.data)
        }))

    }

    const map_function = (data) => {
        return {
            title: fulldate_of_date(data["record_time"]),
            image: null,
            subtitle: null,
            navigate_function: () => {stack_navigate("DataDetail", {data_id:data["id"]}) }
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