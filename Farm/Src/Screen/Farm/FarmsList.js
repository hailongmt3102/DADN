import React from 'react';
import axiosInstance from "../../Context/Axios";
import { stack_navigate, stack_navigatew } from "../../Context/NavigationRoot";
import ListView from "../../Component/ListView"
import Button from '../../Component/Button';
import { ScrollView, StyleSheet } from 'react-native';

const FarmsList = (props) => {

    const get_data = async () => {

        data = await axiosInstance.post(
            "api/farms/matrix", {}
        ).then(resp => resp.data.data)
        // await set_function({"data":"data"})
   

        return data;
    }

    const map_function = (data) => {
        
        return {
            title: (new String(data["name"])).toUpperCase(),
            image: data.image,
            subtitle: null,
            navigate_function: () => { props.navigation.push('Farm',{farmUUID:data.uuid}) }
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
                onPress={() => { props.navigation.push('CreateFarm') }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 40,
        backgroundColor: 'red',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 10,
    },
    textStyle: {
        fontSize: 20,
    }
});

export default FarmsList;