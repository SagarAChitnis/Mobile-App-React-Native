/*
* UserItems.js
* Author: Sagar A. Chitnis
* Purpose: Display listings made by the current user
*/

import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';

import Screen from '../components/Screen';
import UserCard from '../components/UserCard';
import colors from '../config/colors';
import routes from '../navigation/routes';
import firebase from '../backend/firebase';


const wait = timeout => {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
};

const db = firebase.firestore();

function ListingsScreen({ navigation }) {

	const [listings, setListings] = useState([]);
	const [] = useState(true);
	// const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(500).then(() => setRefreshing(false));
	}, []);


	const getListings = async () => {
		const listings = await db.collection('listings').get();
		const temp = [];
		listings.forEach((querySnapshot) => {
			const data = querySnapshot.data();
			temp.push(data);
		});
		setListings(temp);
	};

	useEffect(() => {
		getListings();
	}, []);

	// this is used to refresh the feed when it is navigated to after
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getListings();
		});

		return unsubscribe;
	}, [navigation]);

	const uid = firebase.auth().currentUser.uid;

	const sortArray = (list) => {
		return (list.sort((a, b) => (
			(a.price - b.price))
		))
	}

	const filterArray = list => {
		//console.log(categ['categ'])
		return (list.filter((a) => (
			a.uid == uid//categ['categ']
		)))
	}

	return (
		<Screen style={styles.screen}>

			{/* {console.log(firebase.auth().currentUser.uid)} */}
			<FlatList
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				data={sortArray(filterArray(listings))}
				keyExtractor={(listing) => listing.id.toString()}
				renderItem={({ item }) => (
					<UserCard
						title={item.title}
						//subTitle={'$' + item.price}
						//away = {Math.round(getDistanceFromLatLonInKm(lat, long, item.location.latitude, item.location.longitude)) + ' kms away'}
						// when the user posts a new image we have to send it to the database.
						// the thumbnail for the listing will be the first image in the images array
						imageUrl={item.imageURLs[0]}
						onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
						docid={item.docid}
					/>
				)}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 20,
		backgroundColor: colors.light,
	},
	sortbutton: {
		width: 120,
		backgroundColor: 'green',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		borderRadius: 30,
		flexDirection: "row",
	},
});

export default ListingsScreen;


