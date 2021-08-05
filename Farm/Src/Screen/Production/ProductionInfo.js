import React,
{
    useState,
    useEffect
} from 'react';
import {
    Switch,
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';



import axiosInstance from "../../Context/Axios";

import {
    key_set,
    short_date,
    crop_state
} from "../../Context/MyTool"

import ListView from '../../Component/ListView';

const ProductionInfo = (props) => {
    const { production_uuid } = props.route.params
    const get_data = async () => {
        const data = await axiosInstance.get('api/productions/get', {
            params: {
                uuid: production_uuid
            }
        }
        ).then(resp => resp.data.data)

        const array = [
            'image', 'name', 'period', 'temp_lower_bound', 'temp_upper_bound',
            'soil_humid_lower_bound', 'soil_humid_upper_bound',]
        let returnData = array.map((key) => {
            return {
                key: key,
                value: data[key]
            }
        })


        return returnData
    }

    const map_function = (data) => {
        if (data.key == 'image')
            return {
                leftStyle: {
                    flexDirection: 'column'
                },
                titleStyle: {
                    flex: 1,
                    paddingLeft: 0
                },
                title: (
                    <View style={[styles.image_container, { width: 330 }]}>
                        <Image source={{ uri: data.value }}
                            style={{ width: 200, height: 200 }} />
                    </View>),
                image: null,
                subtitle: null,
                navigate_function: null
            }
        else
            return {
                title: key_set[data.key],
                image: null,
                subtitle: <Text>{data.value}</Text>,
                // navigate_function: () => { }
            }
    }


    return (
        <ScrollView>
            <ListView
                static={true}
                get_data={get_data}
                map_function={map_function}
            />
        </ScrollView>
    )


}
export default ProductionInfo;

const styles = StyleSheet.create({
    image_container: {
        flex: 1,
        // height: 200,
        alignItems: "center",
        justifyContent: "center"
    },
})