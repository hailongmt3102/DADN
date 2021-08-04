import React from 'react';
import axiosInstance from '../../Context/Axios';
import ListView from '../../Component/ListView';

const DataList = (props) => {
    const {fieldUUID} = props

    const get_data = async () => {

        const data = await axiosInstance.post("/api/farms/fields/datas/matrix",{
            field_uuid:fieldUUID
        })
            .then(resp => {
                return resp.data.data
            })
        return data

    }

    const convertDate = (value)=> {
        try {
            return dateToDDMMYYYY(stringToDate(value))
        }catch (exc) {
            return value
        }
    }


    const map_function = (data) => {

        return {
            key:data["uuid"],
            title: convertDate(data.updated_at),
            // image: data["image"],
            // subtitle: null,
            // key:data['uuid'],
            navigate_function: () => { props.navigation.push("DataInfo", { dataUUID: data["uuid"] }) }
        }
    }
    return (
        <ListView
            get_data={get_data}
            map_function={map_function}
        />

    )
}

export default DataList;