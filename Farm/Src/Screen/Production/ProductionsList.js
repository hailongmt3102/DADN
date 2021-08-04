import React from 'react';
import axiosInstance, { baseURL } from "../../Context/Axios";
import ListView from '../../Component/ListView';
import {
    stack_navigate
} from "../../Context/NavigationRoot"

const ProductionsList = (props) => {

    const get_data = async () => {

        const data = await axiosInstance.get("/api/productions/matrix")
            .then(resp => {
                return resp.data.data
            })
        return data

    }

    const map_function = (data) => {

        return {
            title: (new String(data["name"])).toUpperCase(),
            image: data["image"],
            subtitle: null,
            key:data['uuid'],
            navigate_function: () => { stack_navigate("ProductionInfo", { production_uuid: data["uuid"] }) }
        }
    }
    return (
        <ListView
            get_data={get_data}
            map_function={map_function}
        />

    )
}

export default ProductionsList;