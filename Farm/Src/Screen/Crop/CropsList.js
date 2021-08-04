import React from 'react';
import axiosInstance from '../../Context/Axios';
import ListView from '../../Component/ListView';
import { ScrollView, StyleSheet } from 'react-native';
import { stringToDate,dateToDDMMYYYY } from '../../Context/MyTool';
// import Field from './Field';

const CropsList = (props) => {
	const fieldUUID = props.fieldUUID || (props.route && props.route.params.fieldUUID);

    const get_data = async () => {

        data = await axiosInstance.post(
            "api/farms/fields/crops/matrix", {field_uuid:fieldUUID}
        ).then(resp => resp.data.data)

        return data;
    }

    const map_function = (data) => {

        return {
            title: data.production.name,
            image: data.production.image,
            subtitle: dateToDDMMYYYY(stringToDate(data.created_at)),
            navigate_function: () => { props.navigation.push('Crop',{cropUUID:data.uuid}) }
        }
    }

    return (
        <ScrollView>
            <ListView
                get_data={get_data}
                map_function={map_function}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 40,
        backgroundColor: 'red',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 10,
    },
    textStyle: {
        fontSize: 20,
    }
});

export default CropsList;