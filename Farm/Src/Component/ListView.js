import React, { Component } from 'react';
import {
	Switch,
	TouchableOpacity,
	View,
	Image,
	Text,
	SafeAreaView,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
	ScrollView,
	RefreshControl
} from 'react-native';


import { ListItem, Avatar } from 'react-native-elements';


class ListView extends Component {
	constructor(props) {
		super(props)
		this.state = { refreshing: true }
	}

	componentDidMount() {
		this.onRefresh()
	}

	onRefresh = () => {
		this.setState({ refreshing: true });
		this.props.get_data().then(data => {
			this.setState({
				data,
				refreshing: false
			});
		});
	}

	contentGenerator = () => {
		if (this.state.data) {
			return (this.state.data.length == 0 && (
				<ListItem bottomDivider>
					<ListItem.Title style={[{ marginTop: 10 }]}>
						No data to display
					</ListItem.Title>
				</ListItem>) || this.state.data.map((entrie, index) => {

					const entrie_data = this.props.map_function(entrie)
					const { image, title, subtitle, navigate_function } = entrie_data

					return (
						<ListItem key={entrie_data.key || index} style={styles.field_container} bottomDivider>

							<TouchableOpacity
								onPress={navigate_function}
								style={[styles.field_data_title, entrie_data.leftStyle]}>
								{
									image && (
										<Image
											source={{ uri: image }}
											style={[{ width: 50, height: 50, borderRadius: 50, borderWidth: 1 }, entrie_data.imageStyle]}
										/>
									)
								}
								{
									title && (
										<ListItem.Title style={[{ paddingLeft: 10 }, entrie_data.titleStyle]}>
											{title}
										</ListItem.Title>
									)
								}
							</TouchableOpacity>
							{
								subtitle && (
									<ListItem.Subtitle style={[entrie_data.rightStyle]}>
										{subtitle}
									</ListItem.Subtitle>
								)
							}
						</ListItem>
					)
				})
			)
		}
		else {
			return (
				<ListItem bottomDivider>
					<ListItem.Title style={[{ marginTop: 10 }]}>
						Loading
					</ListItem.Title>
				</ListItem>
			)
		}
	}

	render() {


		return (
			<ScrollView
				style={styles.container}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this.onRefresh}
					/>
				}
			>

				<View style={styles.data_container}>
					{
						this.contentGenerator()
					}
				</View>
			</ScrollView>
		)

	}
}

export default ListView;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// // flexDirection: 'row',
		// backgroundColor: 'red',
		// // '#FBFDFE',
		// width: width,
		// paddingTop: 20,
	},
	image_container: {

	},
	data_container: {
		// backgroundColor:'black',
	},

	field_container: {},
	avatar: {
		width: 20
	},
	field_data_title: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
})

