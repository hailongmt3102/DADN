import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text




} from 'react-native';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';

import CropDetail from '../Component/CropDetail'


const Tab = createMaterialTopTabNavigator();

const CropPage = (props) => {
    const { crop_id } = props.route.params
    const [data, setData] = useState({})
    const Test = (props) => {
        console.log(props)
        return <View></View>
    }

    // let field_id = 1;
    return (
        <Tab.Navigator
        // tabBar={props => <Test {...props} />}
        >

            <Tab.Screen name="Detail">
                {() => <CropDetail {...props} crop_id={crop_id} mode={""} data={data} setData={setData}/>}
            </Tab.Screen>

             {/* <Tab.Screen name="Latest crop">
                {() => <CropDetail  {...props} field_id={field_id} mode={"field"} />}
            </Tab.Screen> */}

            {/*<Tab.Screen name="All crops">
                {() => <FieldAllCrop  {...props} field_id={field_id} />}
            </Tab.Screen>
            <Tab.Screen name="Sensors">
                {() => <FieldSensors  {...props} field_id={field_id} />}
            </Tab.Screen> */}


        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tab: {
        // borderBottomRightRadius: 50,
        // borderBottomRightRadius: 50,
        // backgroundColor:"red"
    }
})
export default CropPage;