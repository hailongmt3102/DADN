import React from 'react';
import {} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FieldDetail from './fields/fieldDetail'
import FieldLastedCrop from './fields/fieldLastedCrop'
import FieldAllCrop from './fields/fieldAllCrop'
import FieldSensor from './fields/fieldSensor'

const Tab = createMaterialTopTabNavigator();

const FieldPage = ({route, navigation}) => {
    const field_id = route.params.field_id
    return(
        <Tab.Navigator>
            <Tab.Screen name="Chi tiết">
                {() => <FieldDetail field_id = {field_id} />}
            </Tab.Screen>

            <Tab.Screen name="Mùa vụ gần nhất" component={FieldLastedCrop}/>

            <Tab.Screen name="Tất cả mùa vụ" component={FieldAllCrop}/>

            <Tab.Screen name="Cảm biến" component={FieldSensor}/>
        </Tab.Navigator>
    )
}

export default FieldPage;