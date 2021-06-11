import React from 'react';
import axiosInstance, { baseURL } from "../Context/Axios";
import {
    MyList
} from "../Component/MyList"
import {
    stack_navigate
}from "../Context/NavigationRoot"
const ProductionList = (props) => {



    const get_data = (set_function) => {

        (axiosInstance.get(
            ("/api/production/")
        ).then(resp => {
            set_function(resp.data)
        }))

    }

    const map_function = (data) => {

        return {
            title: (new String(data["production_name"])).toUpperCase(),
            image: data["production_image"],
            subtitle: null,
            navigate_function: () => {stack_navigate("ProductionDetail", {production_id:data["id"]}) }
        }
    }
    return (
        <MyList
            get_data={get_data}
            map_function={map_function}
        />

    )
}

export default ProductionList;