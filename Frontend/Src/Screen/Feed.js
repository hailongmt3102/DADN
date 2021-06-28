import React from 'react';
import {
    ScrollView
} from "react-native"
import axiosInstance from '../Context/Axios';
import { stack_navigate, stack_navigatew } from "../Context/NavigationRoot";
import {
    MyList
} from "../Component/MyList"
import CenterButton from "../Component/CenterButton"
import { ScrollViewComponent } from 'react-native';
const Feeds = (props) => {

    const { field_id } = props

    const get_data = async (set_function) => {
        return (axiosInstance.get(
            "/api/device/feed/"
        ).then(resp => {
            set_function(resp.data)
            return resp.data
        }))

    }

    const map_function = (data) => {
        return {
            title: (new String(data["feed_username"])).toUpperCase(),
            image: null,
            subtitle: null,
            navigate_function: () => { stack_navigate("EditDeleteFeed", { ...data }) }
        }
    }
    return (
        <ScrollView>
            <MyList
                get_data={get_data}
                map_function={map_function}
            />
            <CenterButton
                action={() => {
                    stack_navigate("CreateFeed", {})
                }}
                text={"New feed"}
                color={"pink"}
            />
        </ScrollView>

    )
}

export default Feeds;