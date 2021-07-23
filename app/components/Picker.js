/*
* Picker.js
* Author: Sagar A. Chitnis
* Purpose: Export a picker component which displays a list of items in a modal
*/

import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Modal,
	Button,
	FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import AppText from './Text';
import Screen from './Screen';
import PickerItem from './PickerItem';

function AppPicker({
	icon,
	placeholder,
	items,
	onSelectItem,
	selectedItem,
	width = '100%',
	PickerItemComponent = PickerItem,
	numberOfColumns = 1,
}) {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
				<View style={[styles.container, { width: width }]}>
					{icon && (
						<MaterialCommunityIcons
							name={icon}
							size={20}
							color={defaultStyles.colors.medium}
							style={styles.icon}
						/>
					)}
					{selectedItem ? (
						<AppText style={styles.text}>{selectedItem.name}</AppText>
					) : (
							<AppText style={styles.placeholder}>{placeholder}</AppText>
						)}
					<MaterialCommunityIcons
						name='chevron-down'
						size={20}
						color={defaultStyles.colors.medium}
					/>
				</View>
			</TouchableWithoutFeedback>
			<Modal visible={modalVisible} animationType='slide'>
				<Screen>
					<Button title='Close' onPress={() => setModalVisible(false)}></Button>
					<FlatList
						data={items}
						numColumns={numberOfColumns}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<PickerItemComponent
								item={item}
								label={item.name}
								onPress={() => {
									setModalVisible(false);
									onSelectItem(item);
								}}
							/>
						)}
					/>
				</Screen>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultStyles.colors.light,
		borderRadius: 25,
		flexDirection: 'row',
		padding: 15,
		marginVertical: 10,
	},
	placeholder: {
		color: defaultStyles.colors.medium,
		flex: 1,
	},
	text: {
		flex: 1,
	},
	icon: {
		marginRight: 10,
	},
});

export default AppPicker;
