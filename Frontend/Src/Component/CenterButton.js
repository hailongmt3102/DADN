import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions
} from 'react-native';
import React, { useContext } from "react"
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;



const CenterButton = (props) => {
    const { action, text, color } = props

    const styles = StyleSheet.create({
        button_container: {
            // flex: ,
            width: width,
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingTop: 20,
            paddingBottom: 20,
            // backgroundColor:"red"
        },
        button: {
            // flex:1,
            borderRadius: 20,
            height: 40,
            width: 150,
            alignItems: 'center',
            backgroundColor: color ? color : '#9A79FE',
            justifyContent: 'space-evenly',
            margin: "auto",
            textAlign: 'center',
            flexDirection: 'row',

        },
    })

    return (
        <View style={styles.button_container}>
            <TouchableHighlight
                onPress={action}
                style={styles.button}
            >
                <Text>{text}</Text>
            </TouchableHighlight>
        </View>)
}


export default CenterButton;