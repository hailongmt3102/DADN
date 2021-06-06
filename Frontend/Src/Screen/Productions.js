import React from 'react';
import axiosInstance, { baseURL } from "../Context/Axios";
import {
    MyList
} from "../Component/MyList"
const ProductionList = (props) => {



    const get_data = (set_function) => {

        console.log(axiosInstance.get(
            ("/api/production/" )
        ).then(resp => {
            console.log()
            set_function(resp.data)
        }))

    }

    const map_function = (data) => {
        console.log("this is data",data["production_image"])
        return {
            title: (new String(data["production_name"])).toUpperCase(),
            image: data["production_image"],
            subtitle: null,
            navigate_function: () => { }
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