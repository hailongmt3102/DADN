import React from 'react';
import axiosInstance from "../../Context/Axios";
import ListView from "../../Component/ListView"
import Button from '../../Component/Button';
import { ScrollView, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';
const Item = Picker.Item;

const FeedsList = (props) => {
    const { farmUUID } = props
    const get_data = async () => {

        const data = await axiosInstance.post(
            "api/farms/feeds/matrix", {
            farm_uuid: farmUUID
        }
        ).then(resp => resp.data.data)

        return data;
    }

    const handleOption = (uuid, v) => {

        if (v == 0)
            props.navigation.push('UpdateFeed', { farmUUID: farmUUID, feedUUID: uuid })
    }

    const map_function = (data) => {

        return {
            title: (new String(data["username"])).toUpperCase(),
            subtitle: (
                <Picker
                    mode="dropdown"
                    style={{ width: 50, alignSelf: "flex-start", height: 30 }}
                    numberOfLines={2}
                    selectedValue={2}
                    onValueChange={(v) => handleOption(data.uuid, v)}
                >
                    <Item
                        enabled={false}
                        key={2}
                        label={'Actions'}
                        value={2}
                    />
                    <Item
                        key={0}
                        label={'update'}
                        value={0}
                    />
                    <Item
                        key={1}
                        label={'delete'}
                        value={1}
                    />
                </Picker>),
            rightStyle: {
                marginLeft: 10,
                width: 50,
            }
        }
    }

    return (
        <ScrollView>
            <ListView
                get_data={get_data}
                map_function={map_function}
            />
            <Button
                buttonStyle={styles.buttonStyle}
                textContent={'New'}
                textStyle={styles.textStyle}
                onPress={() => { props.navigation.push('CreateFeed', { farmUUID: farmUUID }) }}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 40,
        width: 100,
        backgroundColor: '#e3ffed',
        borderRadius: 15,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20
    },
    textStyle: {
        fontSize: 20,
    }
});

export default FeedsList;