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
import {
    ListItem,
} from 'react-native-elements';


import axiosInstance, {
    baseURL
} from "../Context/Axios";

import {
    key_set,
    short_date,
    crop_state
} from "../Context/MyTool"

const CropDetail = (props) => {

    const { mode, data, setData } = props
    let field = props.hasOwnProperty("field_id") ? props["field_id"] : ""

    const get_data = () => {
        (axiosInstance.get(
            mode === 'field' ?
                ("/api/field/" + field.toString() + "/crop/")
                : ("/api/crop/" + props["crop_id"])

        ).then(resp => {
            setData(resp.data)
        }))
    }

    // const [data, set_data] = useState([])
    const [is_loaded, setLoaded] = useState(false)
    const [first_load, setFirstLoad] = useState(false)

    useEffect(() => {
        console.log("1")
        setFirstLoad(!first_load)
    }, [])

    useEffect(() => {
        if (first_load)
            get_data()
    }, [first_load])


    useEffect(() => {
        if (first_load)
            setLoaded(!is_loaded)
    }, [data])

    if (first_load) {
        if (data.hasOwnProperty("id")) {
            let render_data = {
                plant: data["crop_production"]["production_name"],
                crop_start_date: short_date(data["crop_start_date"]),
                crop_harvest_date: data["crop_harvest_date"] ? short_date(data["crop_harvest_date"]) : "",
                crop_state: crop_state[data["crop_state"]],
            }
            return (
                <ScrollView>
                    <View
                        style={[styles.container, { width: "100%" }]}

                    >
                        <View style={styles.image_container}>
                            <Image
                                source={{ uri: baseURL + data["crop_production"]["production_image"] }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.data_container}>
                            {
                                Object.keys(render_data).map((key, index) => {
                                    return (
                                        <ListItem key={index} bottomDivider>
                                            <ListItem.Title style={styles.data_title}>
                                                {key_set[key]}
                                            </ListItem.Title>

                                            <ListItem.Subtitle>
                                                {render_data[key]}
                                            </ListItem.Subtitle>
                                        </ListItem>
                                    )
                                })
                            }
                        </View >






                    </View>
                </ScrollView >
            )
        }
        else return <View><Text>No Crop</Text></View>
    }
    else return (<View><Text>loading</Text></View>)
}


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: '#FBFDFE',
        width: width,

    },
    image_container: {
        width: width,
        height: 200,
        justifyContent: "space-evenly",

        alignItems: "center"
    },
    data_container: {

    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: "black",
        alignSelf: "auto",
        marginVertical: 10
        // overflow:"hidden"
    },
    data_title: {
        flex: 1, flexDirection: "row",
        alignItems: "center"
    },
    data_value: {
        width: width,
        flex: 1
    },


})

export default CropDetail;