import React, { useState, useEffect } from 'react';
import {
    Switch,
    TouchableOpacity,
    View,
    Image,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    ScrollView
} from 'react-native';

import {
    createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';
import axiosInstance, { baseURL } from "../Context/Axios";
import { stack_navigate } from '../Context/NavigationRoot';
import { get_access_token } from '../Context/AsyncStorage';
import Request from '../Context/Request';
import { ListItem, Avatar } from 'react-native-elements';
import { key_set } from "../Context/MyTool"
import { shouldUseActivityState } from 'react-native-screens';
// import userLogin from './userLogin';
export const MyList = (props) => {


    const { get_data, map_function } = props
    
    const [data, set_data] = useState([])
    const [is_loaded, setLoaded] = useState(false)
    const [first_load, setFirstLoad] = useState(false)

    useEffect(() => {
        console.log("1")
        setFirstLoad(!first_load)
    }, [])

    useEffect(() => {
        if (first_load)
            get_data(set_data)
    }, [first_load])


    useEffect(() => {
        if (first_load)
            setLoaded(!is_loaded)
    }, [data])

    if (is_loaded) {

        return (
            <ScrollView
                style={styles.container}

            >

                <View>
                    {
                        data.map((entrie, index) => {

                            const entrie_data = map_function(entrie)
                            const { image, title, subtitle, navigate_function } = entrie_data

                            return (
                                <ListItem key={index} style={styles.field_container} bottomDivider>

                                    <TouchableOpacity

                                        onPress={navigate_function}
                                        style={styles.field_data_title}>
                                        {
                                            (
                                                image !== null ?

                                                    (
                                                        <Image
                                                            source={{ uri: baseURL + image }}
                                                            style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 1 }}
                                                        />
                                                    )

                                                    :

                                                    (<View></View>)
                                            )
                                        }

                                        {(
                                            title != null ?
                                                (<ListItem.Title style={{ paddingLeft: 10 }}>
                                                    {title}
                                                </ListItem.Title>) :
                                                (<View></View>))
                                        }
                                    </TouchableOpacity>


                                    {
                                        (
                                            (subtitle !== null)
                                                ?

                                                (<ListItem.Subtitle>
                                                    {subtitle}
                                                </ListItem.Subtitle>)
                                                :
                                                (<View></View>)
                                        )
                                    }
                                </ListItem>
                            )
                        })
                    }
                </View>


            </ScrollView>
        )
    }
    else return (
        <View><Text>loading</Text></View>
    )
}
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: '#FBFDFE',
        width: width,
        height: height,
        // backgroundColor: "red",
    },
    image_container: {

    },
    fields_container: {},

    field_container: {},
    avatar: { width: 20 },
    field_data_title: {
        flex: 1, flexDirection: "row",
        alignItems: "center"
    },
    
})


export default MyList;