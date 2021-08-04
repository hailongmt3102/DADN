import React from 'react'
import { Switch as DefaultSwtich } from 'react-native'

const Switch = (props) => {
    const value = props.value
    const onPress = props.onPress

    return (
        <DefaultSwtich
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onPress}
            value={value}
        />
    )
}

export default Switch;
