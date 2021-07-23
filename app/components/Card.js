/*
* Card.js
* Author: Sagar A. Chitnis
* Purpose: Export a "Card" component which is a raised container for other comps
*/

import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
} from 'react-native';

import AppText from './Text';

function Card({ title, subTitle, imageUrl, onPress, away }) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.card}>
				<Image style={styles.image} source={{ uri: imageUrl }} />
				<View style={styles.detailsContainer}>
					<AppText numberOfLines={1} style={styles.title}> {title}</AppText>
					<AppText numberOfLines={1} style={styles.price}> {subTitle}</AppText>
					<AppText numberOfLines={1} style={styles.price}> {away}</AppText>
					{/* <AppText style = {styles.subText}> {away}</AppText> */}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 10,
		backgroundColor: 'black',
		marginBottom: 20,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: 200,
	},
	detailsContainer: {
		padding: 20,
	},
	title: {
		//marginBottom: 7,
		fontWeight: 'bold',
		color: 'white'
	},
	price: {
		//marginBottom: 7,
		color: 'white'
	},
});

export default Card;
