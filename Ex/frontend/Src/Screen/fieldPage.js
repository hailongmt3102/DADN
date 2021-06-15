import React from 'react';
import {} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FieldDetail from './fields/fieldDetail'
import FieldLastedCrop from './fields/fieldLastedCrop'
import FieldAllCrop from './fields/fieldAllCrop'
import FieldSensor from './fields/fieldSensor'

const Tab = createMaterialTopTabNavigator();

const FieldPage = (props) => {
    const {field_id} = props.route.params
    console.log(props.route.params)
    return(
        <Tab.Navigator>
            <Tab.Screen name="Nông trại">
				{() => <FieldDetail field_id = {field_id} />}
			</Tab.Screen>

            <Tab.Screen name="Latest crop" component={FieldLastedCrop}/>

            <Tab.Screen name="All crops" component={FieldAllCrop}/>

            <Tab.Screen name="Sensor" component={FieldSensor}/>
        </Tab.Navigator>
    )
}

export default FieldPage;