import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { stack_navigate } from '../Context/NavigationRoot';
import { logout } from "../Context/AsyncStorage"
export default function CustomDrawerContent(props) {
    console.log(props)
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItem
				label="Home"
				onPress={() => {
					stack_navigate("Home", {})
				}}
			/>
                <DrawerItem
                    label="Log out"
                    onPress={async () => {
                        await logout().then(data => {
                            if (data) {
                                // props.navigation.reset()
                                props.navigation.navigate("Login", {})
                            }
                        })
                    }}
                />
			{/* <DrawerItem
                label="Fields"
                onPress={() => {
                    props.navigation.navigate("ListFieldsScreen", {})
                }}
            />
             */}

		</DrawerContentScrollView>
	);
}