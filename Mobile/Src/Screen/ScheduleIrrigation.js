import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { stack_navigate } from "../Context/NavigationRoot"
import { get_mem } from "../Context/AsyncStorage";
import Context from "../Context/Context";
import { ListItem } from 'react-native-elements';
import CenterButton from "../Component/CenterButton";
export default function ScheduleIrrigation(props) {
    // const { field_id } = {field_id:1}
    const field_id = 1
    const [reload, setReload] = useState()
    const [tasks, setTasks] = useContext(Context)
    const [render_data, set_render_data] = useState([])

    useEffect(() => {
        console.log(tasks)
        set_render_data(tasks.filter(task =>
            task[0].field_id === field_id
        ))

    }, [tasks])

    return (
        <ScrollView>
            {render_data.map((task, key) => {
                const time = new Date(task[0].time_stamp)
                return (
                    <TouchableOpacity onPress={() => { }} key={key}>
                        <ListItem bottomDivider>
                            <ListItem.Title style={{ flex: 1 }}>
                                {time.toLocaleString()}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {task[0].duration.toString() + "'"}
                            </ListItem.Subtitle>
                        </ListItem>
                    </TouchableOpacity>
                )
            })}
            <CenterButton
                action={() => { stack_navigate("CreateTask", { ...props }) }}
                text={"New"}
                color={"pink"} />
      
        </ScrollView>
    )
}

