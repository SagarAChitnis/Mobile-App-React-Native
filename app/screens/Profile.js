/*
* Profile.js
* Author: Sagar A. Chitnis
* Purpose: User profile page
*/

import React, { useState, useEffect } from 'react';
import { FlatList, Linking, StyleSheet, View } from 'react-native';
import Icon from '../components/Icon';

import ListItem from '../components/ListItem';
import ListItemSeparatorComponent from '../components/Seperator';
import Screen from '../components/Screen';
import colors from '../config/colors';
import firebase from '../backend/firebase';

const menuItems = [
	{
		title: 'My Listings',
		icon: {
			name: 'format-list-bulleted',
			backgroundColor: colors.primary
		},
		targetScreen: 'My Listings'
	}

];

// Logs out the user from the Firebases Local Persistence on the App
const handleLogOut = () => {
	firebase.auth().signOut();
};

function AccountScreen({ navigation }) {

	const [, setEmail] = useState();
	const [name, setName] = useState();
	const [phone, setPhone] = useState();
	const db = firebase.firestore();

	const getUserInfo = async () => {
		try {
			//const uid = listing.uid; // the uid for the listing
			const uid = firebase.auth().currentUser.uid;
			const userRef = await db.doc(`users/${uid}`).get();
			const { email, name, phone } = userRef.data();
			// console.log(email, name, phone);
			setEmail(email);
			setName(name);
			setPhone(phone);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserInfo();
	}, []);
	console.log(phone)


	return (
		<Screen style={styles.screen}>
			<View style={styles.container}>
				<ListItem
					title={name}
					// image={require('../assets/logo.jpg')}
					IconComponent={
						<Icon
							name='account'
							backgroundColor='lightgrey'
							size={60}
						/>
					}
				/>
			</View>
			<View style={styles.container3}>
				<FlatList
					data={menuItems}
					keyExtractor={(menuItem) => menuItem.title}
					renderItem={({ item }) => (
						<ListItem
							normalText={item.title}
							IconComponent={
								<Icon
									name={item.icon.name}
									backgroundColor={item.icon.backgroundColor}
								/>
							}
							onPress={() => navigation.navigate(item.targetScreen)}
						/>
					)}
					ItemSeparatorComponent={ListItemSeparatorComponent}
				/>
			</View>
			<View style={styles.container2}>
				<ListItem
					normalText={'Support'}
					IconComponent={<Icon name='email'
						backgroundColor='dodgerblue' />}
					onPress={() => Linking.openURL(`mailto:${('support@foodsave.com')}`)}
				/>
			</View>
			<ListItem
				normalText='Log Out'
				IconComponent={<Icon name='logout' backgroundColor='maroon' />}
				onPress={handleLogOut}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginBottom: 5,
		color: 'white'
	},
	container2: {
		marginVertical: 10,
		color: 'white'
	},
	container3: {
		marginTop: 50,
		marginBottom: 5,
		color: 'white'
	},
	screen: {
		backgroundColor: 'white',
	},
});

export default AccountScreen;
