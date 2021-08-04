import React, {
    useState
} from 'react'
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native'

import axiosInstance from '../../Context/Axios'
import Button from '../../Component/Button'
import ListView from '../../Component/ListView'
import { dateToDDMMYYYY, key_set, stringToDate } from '../../Context/MyTool'



export default function CropInfo(props) {
    const fieldUUID = props.fieldUUID || (props.route && props.route.params.fieldUUID)
    const detail = props.detail || (props.route && props.route.params.detail)
    const cropUUID = props.cropUUID || (props.route && props.route.params.cropUUID)

    const [hasCrop, setHasCrop] = useState(false)
    const [_cropUUID, setCropUUID] = useState()
    const get_data = async () => {
        let data;
        
        if (detail)
        { 
            data = await axiosInstance.get("/api/farms/fields/crops/get", { params: { uuid: cropUUID } })
                .then(resp => {
                    return resp.data.data
                })
        }
        else
            data = await axiosInstance.get("/api/farms/fields/crops/current_crop", { params: { field_uuid: fieldUUID } })
                .then(resp => {
                    return resp.data.data
                })

        return handleData(data)
    }

    const handleData = (data) => {
        if (!data) return []
        setHasCrop(true)
        console.log('check',data)
        setCropUUID(data.uuid)
        return [
            { key: 'image', value: data.production.image },
            { key: 'production', value: data.production.name },
            { key: 'started_at', value: convertDate(data.started_at) },
            { key: 'harvested_at', value: (data.harvested_at && convertDate(data.harvested_at)) || 'Unset' },
            { key: 'state', value: data.state },
        ]
    }

    const convertDate = (value) => {
        try {
            return dateToDDMMYYYY(stringToDate(value))
        } catch (exc) {
            return value
        }
    }


    const map_function = (data) => {
        if (data.key == 'image')
            return {
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
                subtitle: <Text>{new String(data.value)}</Text>,
                navigate_function: () => { }
            }
    }


    return (
        <ScrollView>
            <ListView
                get_data={get_data}
                map_function={map_function}
            />

            {!detail &&
                (hasCrop && (
                    <Button
                        buttonStyle={{ alignSelf: 'center', marginTop: 10 }}
                        textContent={'Detail'}
                        onPress={() => { props.navigation.push('Crop', { cropUUID: _cropUUID }) }}
                    />
                ) || (
                        <Button
                            buttonStyle={{ alignSelf: 'center', marginTop: 10 }}
                            textContent={'New crop'}
                            onPress={() => { props.navigation.push('CreateCrop', { fieldUUID: fieldUUID }) }}
                        />
                    ))
            }
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    image_container: {
        flex: 1,
        // height: 200,
        alignItems: "center",
        justifyContent: "center"
    }
})