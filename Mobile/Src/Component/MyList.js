import React, { useState, useEffect, useCallback } from 'react';
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
    ScrollView,
    RefreshControl
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
import { set } from 'react-native-reanimated';
// import userLogin from './userLogin';
export const MyList = (props) => {


    const { get_data, map_function } = props

    const [data, set_data] = useState([])
    const [is_loaded, setLoaded] = useState(false)
    const [first_load, setFirstLoad] = useState(false)

    useEffect(() => {
        setFirstLoad(!first_load)
    }, [])

    useEffect(() => {
        if (first_load)
            get_data(set_data)
    }, [first_load])


    useEffect(() => {
        if (first_load)
            {
                setLoaded(!is_loaded)
                setFirstLoad(false)
            }
    }, [data])



    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        get_data(set_data).then((sth) => setRefreshing(false));
    }, []);

    if (is_loaded) {

        return (
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >

                <View style={styles.data_container}>
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
                                                []
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
        // flex: 1,
        backgroundColor: '#FBFDFE',
        width: width,
        paddingTop: 10,
    },
    image_container: {

    },
    data_container: {},

    field_container: {},
    avatar: { width: 20 },
    field_data_title: {
        flex: 1, flexDirection: "row",
        alignItems: "center"
    },

})


export default MyList;