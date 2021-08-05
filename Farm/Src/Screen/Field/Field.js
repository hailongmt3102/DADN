import React,{useContext} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    
} from 'react-native';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';

import Context from '../../Context/Context';

import FieldInfo from './FieldInfo';
import CropInfo from '../Crop/CropInfo';
import SensorsList from '../Sensor/SensorsList';
import DataList from '../Data/DataList';
import CropsList from '../Crop/CropsList';
import ScheduleIrrigation from './ScheduleIrrigation';
import IrrigationsList from '../Irrigation/IrrigationsList';
const Tab = createMaterialTopTabNavigator();

const Field = (props) => {
    const { fieldUUID } = props.route.params
    const { farmUUID } = props.route.params
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
                {() => <FieldInfo {...props} fieldUUID={fieldUUID} />}
            </Tab.Screen>

            <Tab.Screen name="Latest crop" >
                {() => <CropInfo  {...props} fieldUUID={fieldUUID} />}
            </Tab.Screen>
            <Tab.Screen name="Crops">
                {() => <CropsList  {...props} fieldUUID={fieldUUID} />}
            </Tab.Screen>
            <Tab.Screen name="Schedule">
                {() => <ScheduleIrrigation  {...props} fieldUUID={fieldUUID} />}
            </Tab.Screen>
            <Tab.Screen name="Sensors">
                {() => <SensorsList  {...props} fieldUUID={fieldUUID} farmUUID={farmUUID} />}
            </Tab.Screen>
            <Tab.Screen name="Datas">
                {() => <DataList  {...props} fieldUUID={fieldUUID} />}
            </Tab.Screen>
            <Tab.Screen name="Irrigations">
                {() => <IrrigationsList  {...props} fieldUUID={fieldUUID} />}
            </Tab.Screen>
            {/* 
            <Tab.Screen name="Timer">
                {() => <ScheduleIrrigation  {...props} field_id={field_id} />}
            </Tab.Screen> 
            */}


        </Tab.Navigator>
    )
}
export default Field;

const styles = StyleSheet.create({
    tab: {

    }
})