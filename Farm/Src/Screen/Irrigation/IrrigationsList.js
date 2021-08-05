import React from 'react';
import axiosInstance from '../../Context/Axios';
import ListView from '../../Component/ListView';
import { stringToDate } from '../../Context/MyTool';
const IrrigationsList = (props) => {
    const {fieldUUID} = props
    const {cropUUID} = props

    const get_data = async () => {
        
        const query_data = {}
        if (fieldUUID)
        query_data.field_uuid = fieldUUID
        if (cropUUID)
            query_data.crop_uuid = cropUUID

        const data = await axiosInstance.post("/api/farms/fields/irrigations/matrix",query_data)
            .then(resp => {
                return resp.data.data
            })
        return data
    }

    const convertDate = (value)=> {
        try {
            return stringToDate(value).toLocaleString()
        }catch (exc) {
            return value
        }
    }


    const map_function = (data) => {

        return {
            key:data["uuid"],
            title: convertDate(data.created_at),
            navigate_function: () => { props.navigation.push("IrrigationInfo", { irrigationUUID: data["uuid"] }) }
        }
    }
    return (
        <ListView
            get_data={get_data}
            map_function={map_function}
        />

    )
}

export default IrrigationsList;