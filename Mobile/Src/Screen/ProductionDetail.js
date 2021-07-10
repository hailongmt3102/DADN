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

const ProductionDetail = (props) => {
    const { production_id } = props.route.params
    const get_data = () => {
        (axiosInstance.get(
            'api/production/' + production_id.toString()
        ).then(resp => {
            setData(resp.data)
        }))
    }

    const [data, setData] = useState([])
    const [is_loaded, setLoaded] = useState(false)
    const [first_load, setFirstLoad] = useState(false)

    useEffect(() => {
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

        let render_data = {
            // production_image: data["production_image"]?data["production_image"]:"Media/production_iamge/default.png",
            production_name: data["production_name"],
            production_period:data["production_period"]
        }
        return (
            <ScrollView>
                <View
                    style={[styles.container, { width: "100%" }]}

                >
                    <View style={styles.image_container}>
                        <Image
                            source={{ uri: baseURL + (data["production_image"]?data["production_image"]:"Media/production_iamge/default.png") }}
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

export default ProductionDetail;