/*
* Items.js
* Author: Sagar A. Chitnis
* Purpose: Displays the list of items available
*/

import React, { useEffect, useState } from 'react';
import { FlatList, Picker, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import routes from '../navigation/routes';
import firebase from '../backend/firebase';

/*
const categories = [
    { label: 'Fruits', value: 1, backgroundColor: 'red', icon: "apple" },
    { label: 'Fast Food', value: 2, backgroundColor: 'yellow', icon: 'food' },
    { label: 'Sweets', value: 3, backgroundColor: 'blue', icon: 'cupcake' },
    { label: 'Veggies', value: 4, backgroundColor: 'green', icon: 'leaf' },
    { label: 'Dairy', value: 5, backgroundColor: 'grey', icon: 'cow' },
    { label: 'Poultry', value: 6, backgroundColor: 'orange', icon: 'egg' }
]
*/

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

const db = firebase.firestore();

function ListingsScreen({ navigation }) {

    const [categ, setCateg] = useState({ categ: 1 });
    const [radius, setRadius] = useState({ radius: 100 })

    const [listings, setListings] = useState([]);

    const [] = useState(true);
    const [lists, setLists] = useState(listings);

    const [, setRefreshing] = React.useState(false);

    // const [loading, setLoading] = useState(true);

    // Fetch listings from Firebase
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

    useEffect(() => {
        setLists(sortArray(listings));
    }, [listings])

    // this is used to refresh the feed when it is navigated to after
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getListings();
        });

        return unsubscribe;
    }, [navigation]);

    const location = useLocation();
    var lat = 0
    var long = 0
    for (var property in location) {
        if (property === 'latitude') {
            lat = location[property];
        }
        else {
            long = location[property];
        }
    }

    // Calculate straight line distance between a lat-long pair
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    for (var i = 0; i < listings.length; i++) {

        var itemLat = listings[i].location.latitude
        var itemLong = listings[i].location.longitude

        var itemDist = Math.round(getDistanceFromLatLonInKm(lat, long, itemLat, itemLong))
        console.log(itemDist)
        listings[i]['away'] = itemDist
    }

    const sortArray = (list) => {
        return (list.sort((a, b) => (
            (a.price - b.price))
        ))
    }

    // Sorting Listings default by price
    const handleSort = () => {
        setLists(listings.sort((a, b) => (
            (a.price - b.price))))
    }

    // Filter Listing of food items by food categories
    const handleFilter = () => {
        setLists(lists.filter((a) => (
            a.categoryId == categ['categ']
        )))
    }

    // Filter Listing of food items by distance from current user location
    const handleFilterLocation = () => {
        setLists(lists.filter((a) => (
            a.away <= radius['radius']
        )))
    }

    return (
        <Screen style={styles.screen}>

            <View style={styles.container}>
                <Picker
                    selectedValue={categ}
                    style={{ height: 50, width: 140 }}
                    onValueChange={(itemValue) => setCateg({ categ: itemValue })}>
                    <Picker.Item label="Category" value={0} />
                    <Picker.Item label="Fruits" value={1} />
                    <Picker.Item label="Fast Food" value={2} />
                    <Picker.Item label="Sweets" value={3} />
                    <Picker.Item label="Veggies" value={4} />
                    <Picker.Item label="Dairy" value={5} />
                    <Picker.Item label="Poultry" value={6} />
                </Picker>
                <TouchableOpacity style={styles.button} onPress={handleFilter}><MaterialCommunityIcons name='filter' color={colors.primary} size={18} /></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSort}><MaterialCommunityIcons name='filter-remove' color={colors.primary} size={18} /></TouchableOpacity>
                {/* <TouchableOpacity style={styles.button} onPress={handleFilterLocation}><MaterialCommunityIcons name='filter' color={colors.primary} size={18} /></TouchableOpacity> */}

            </View>
            <View style={styles.container}>
                <Picker
                    selectedValue={radius}
                    style={{ height: 50, width: 140 }}
                    onValueChange={(itemValue) => setRadius({ radius: itemValue })}>
                    <Picker.Item label="Distance" value={0} />
                    <Picker.Item label="5 kilometres" value={5} />
                    <Picker.Item label="10 kilometres" value={10} />
                    <Picker.Item label="20 kilometres" value={20} />
                    <Picker.Item label="50 kilometres" value={50} />
                </Picker>
                <TouchableOpacity style={styles.button} onPress={handleFilterLocation}><MaterialCommunityIcons name='filter' color={colors.primary} size={18} /></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSort}><MaterialCommunityIcons name='filter-remove' color={colors.primary} size={18} /></TouchableOpacity>
            </View>


            {/* {console.log(firebase.auth().currentUser.uid)} */}
            <FlatList
                //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={lists}
                keyExtractor={(listing) => listing.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        title={item.title}
                        subTitle={'$' + item.price}
                        //away = {Math.round(getDistanceFromLatLonInKm(lat, long, item.location.latitude, item.location.longitude)) + ' kms away'}
                        away={item.away + ' kms away'}
                        // when the user posts a new image we have to send it to the database.
                        // the thumbnail for the listing will be the first image in the images array
                        imageUrl={item.imageURLs[0]}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
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
    container: {
        flexDirection: 'row',
        marginBottom: 20
    },
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: 70,
        height: 15,
        marginVertical: 10,
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 5
    },
    text: {
        color: colors.primary,
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold'

    }
});

export default ListingsScreen;
