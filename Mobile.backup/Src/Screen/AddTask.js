import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Platform,
    Text,
    ScrollView,
    Dimensions,
    RefreshControl,
    TouchableOpacity,
    TextInput
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackgroundTimer from 'react-native-background-timer';
import { ListItem } from 'react-native-elements';
import CenterButton from '../Component/CenterButton';
import Context from '../Context/Context';
import { validation } from '../Context/MyTool';
import { ToggleField } from '../Context/MyTool';
import { set_mem } from '../Context/AsyncStorage';

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderRadius: 20,
        height: 40,
        width: 150,
        backgroundColor: '#9A79FE',
        justifyContent: 'space-evenly',
        margin: "auto",
        alignSelf: "center",
        alignItems: "center",
        textAlign: 'center',
        flexDirection: 'row',

    },
    text_input: {
        height: 40,
        width: 300,
        alignSelf: 'center',
        fontSize: 18,
        borderBottomWidth: 2,
        borderColor: '#000',
        marginTop: 20
    }
})

export default function CreateTask(props) {
    // const { field_id } = props.route.param
    console.log(props)
    const field_id = 1
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [duration, setDurantion] = useState('1')
    const [show, setShow] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const [tasks, setTasks] = useContext(Context)
    return (
        <ScrollView style={{
            flex: 1,
            flexDirection: 'row',
            width: 500,
        }}
        >
            <ListItem bottomDivider>
                <ListItem.Title style={{ flex: 1 }}>
                    {date.toDateString()}
                </ListItem.Title>
                <ListItem.Subtitle>
                    <TouchableOpacity
                        onPress={showDatepicker}
                        style={styles.button}
                    >
                        <Text>{"Adjust date"}</Text>
                    </TouchableOpacity>

                </ListItem.Subtitle>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Title style={{ flex: 1 }} >
                    {date.getHours().toString() + ":" + date.getMinutes().toString()}
                </ListItem.Title>
                <ListItem.Subtitle >
                    <TouchableOpacity
                        onPress={showTimepicker}
                        style={styles.button}
                    >
                        <Text>{"Adjust time"}</Text>
                    </TouchableOpacity>

                </ListItem.Subtitle>
            </ListItem>
            <TextInput
                style={
                    styles.text_input
                }
                placeholder="Duration"
                value={duration}
                onChangeText={(v) => {
                    if (validation.isInteger(v))
                        setDurantion(v)
                    else {
                        alert("input integer only")
                        setDurantion(duration)
                    }


                }}
            />
            <CenterButton
                action={() => {
                    if (date.getTime() < new Date().getTime())
                        alert("invalid date time")
                    else {
                        const _duration = parseInt(duration)
                        const time_diff = date.getTime() - new Date().getTime()

                        setTasks([
                            ...tasks,
                            [
                                {
                                    time_stamp: date.getTime(),
                                    field_id: field_id,
                                    duration: _duration,
                                },
                                [
                                    BackgroundTimer.setTimeout(() => {

                                        ToggleField(field_id, true)
                                    }, time_diff),
                                    BackgroundTimer.setTimeout(() => {
                                        ToggleField(field_id, false)
                                    }, time_diff + (_duration * 60000)),
                                ]
                            ]
                        ])
                        alert("timer added")
                        set_mem("schedule_task", JSON.stringify({
                            tasks: [
                               tasks.map((task, key) => task[0])
                            ]
                        }))
                        props.navigation.pop()
                    }

                }}
                text={"add"}
                color={"pink"} />
            <View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>

        </ScrollView>

    );
};


