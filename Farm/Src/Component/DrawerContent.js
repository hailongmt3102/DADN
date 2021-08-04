import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { stack_navigate } from '../Context/NavigationRoot';
import { logout } from "../Context/AsyncStorage"
export default function CustomDrawerContent(props) {

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItem
				label="Home"
				onPress={() => {
					stack_navigate("Home", {})
				}}
			/>
			{/* <DrawerItem
                label="Fields"
                onPress={() => {
                    props.navigation.navigate("ListFieldsScreen", {})
                }}
            />
            <DrawerItem
                label="Log out"
                onPress={() => {
                    logout().then(data => {
                        if (data) {
                            props.navigation.navigate("UserLoginScreen", {})
                        }
                    })
                }}
            /> */}

		</DrawerContentScrollView>
	);
}