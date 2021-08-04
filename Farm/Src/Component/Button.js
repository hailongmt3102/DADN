import {
	Text,
	TouchableHighlight,
	StyleSheet,

} from 'react-native';
import React from "react"




const Button = (props) => {

	const  textStyle 		= props.textStyle 		|| {}
	const  buttonStyle 		= props.buttonStyle 	|| {}
	const  textContent 		= props.textContent 	|| null
	const  onPress 			= props.onPress 		|| null

	const styles = StyleSheet.create({
		button: {
			borderRadius: 20,
			height: 40,
			width: 150,
			alignItems: 'center',
			backgroundColor: '#9A79FE',
			justifyContent: 'space-evenly',
			margin: "auto",
			textAlign: 'center',
			flexDirection: 'row',

		},
	})

	return (
		<TouchableHighlight
			onPress={onPress}
			style={[styles.button, buttonStyle]}
		>
			<Text style={textStyle}>{textContent}</Text>
		</TouchableHighlight>
	)
}


export default Button;