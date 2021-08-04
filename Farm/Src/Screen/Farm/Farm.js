import React, { useState, useEffect, useCallback } from 'react';
import {
	StyleSheet,
	Dimensions,
} from 'react-native';

import {
	createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';


import FarmInfo from './FarmInfo'
import FeedsList from '../Feed/FeedsList';
// import Feeds from './Feed';
const tab = createMaterialTopTabNavigator();

const Farm = (props)=> {

	return (
		<tab.Navigator>
			<tab.Screen name="Farm">
				{() => <FarmInfo farmUUID={props.route.params.farmUUID} {...props}/>}
			</tab.Screen>
			<tab.Screen name="Feed">
				{() => <FeedsList farmUUID={props.route.params.farmUUID} {...props}/>}
			</tab.Screen>
			{/* <tab.Screen name="Feeds">
				{() => <Feeds {...props} data={{ farm, setFarm }} />}
			</tab.Screen> */}
		</tab.Navigator>
	)
}


export default Farm;