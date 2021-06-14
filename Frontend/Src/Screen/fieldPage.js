import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    
} from 'react-native';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';

import FieldDetail from './fields/fieldDetail'
import FieldLastedCrop from './fields/fieldLastedCrop'
import FieldAllCrop from './fields/fieldAllCrop'
import FieldSensors from './fields/fieldSensor'
import CropDetail from "../Component/CropDetail"

const Tab = createMaterialTopTabNavigator();

const FieldPage = (props) => {
    const { field_id } = props.route.params
    const Test = (props) => {
        
        return <View></View>
    }

    // let field_id = 1;
    return (
        <Tab.Navigator
            tabBarOptions={
                {
                    scrollEnabled: true,
                    activeTintColor:'#e91e63' ,
                    activeBackGroundColor:'#e91e63' ,
                    borderRadius:30
                }
            }
        >

            <Tab.Screen name="Detail" >
                {() => <FieldDetail {...props} field_id={field_id} />}
            </Tab.Screen>

            <Tab.Screen name="Latest crop" >
                {() => <FieldLastedCrop  {...props} field_id={field_id} />}
            </Tab.Screen>

            <Tab.Screen name="All crops">
                {() => <FieldAllCrop  {...props} field_id={field_id} />}
            </Tab.Screen>
            <Tab.Screen name="Sensors">
                {() => <FieldSensors  {...props} field_id={field_id} />}
            </Tab.Screen>


        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tab: {

    }
})
export default FieldPage;