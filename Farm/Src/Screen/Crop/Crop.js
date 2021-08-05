import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import CropInfo from './CropInfo';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';
import DataList from '../Data/DataList';
import IrrigationsList from '../Irrigation/IrrigationsList';

const Tab = createMaterialTopTabNavigator();

const Crop = (props) => {
    const cropUUID = props.cropUUID || (props.route && props.route.params.cropUUID);

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
                {() => <CropInfo {...props} cropUUID={cropUUID} detail={true} />}
            </Tab.Screen>
            <Tab.Screen name="Datas" >
                {() => <DataList {...props} fieldUUID={null} cropUUID={cropUUID}  />}
            </Tab.Screen>
            <Tab.Screen name="Irrigations" >
                {() => <IrrigationsList {...props} fieldUUID={null} cropUUID={cropUUID}  />}
            </Tab.Screen>


        </Tab.Navigator>
    )
}
export default Crop;