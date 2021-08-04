import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity,RefreshControl } from "react-native";
import { stack_navigate } from "../../Context/NavigationRoot"
import Context from "../../Context/Context";
import { ListItem } from 'react-native-elements';
import { get_mem, set_mem } from "../../Context/AsyncStorage";
import Button from "../../Component/Button";

export default function ScheduleIrrigation(props) {
    const fieldUUID = props.fieldUUID || (props.route && params.route.params.fieldUUID)

    const [reload, setReload] = useState()
    const [render_data, set_render_data] = useState([])
    
    const [tasks, setTasks] = useContext(Context)

    useEffect(() => {
        console.log('tasks',tasks)
        set_render_data(tasks.filter(task =>{
            const task_detail = task[0]
            const timeDelta =  new Date().getTime() - (task_detail.time_stamp + 60*task_detail.duration)
            console.log(timeDelta)
            console.log(new Date().getTime())
            return task[0].fieldUUID === fieldUUID
        }
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
            <Button
                onPress={() => { props.navigation.push("CreateTask", { ...props }) }}
                textContent={"New"}
                buttonStyle={{alignSelf:'center',marginTop:10}}
            />

        </ScrollView>
    )
}

