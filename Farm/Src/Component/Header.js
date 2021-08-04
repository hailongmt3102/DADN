import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { stack_navigation_ref } from "../Context/NavigationRoot"
const img = require('../assets/images/burger.png');

export default function Header(props) {
	const { label, navigation } = props

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				flex: 1
			}}
		>
			<Text
				style={{
					flex: 1,
					fontFamily: "Roboto",
					fontSize: 25
				}}
			>
				{label}
			</Text>
			<TouchableOpacity
				onPress={() => { navigation.toggleDrawer(); }}
			>
				<Image
					style={{
						width: 30,
						height: 30
					}}
					source={img}
				/>
			</TouchableOpacity>

		</View>
	)
}