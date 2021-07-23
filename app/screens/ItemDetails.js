/*
* ItemDetails.js
* Author: Sagar A. Chitnis
* Purpose: Displays the details of each listing
*/

import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from '../components/Text';
import colors from '../config/colors';
import useCity from '../hooks/useCity';
import firebase from '../backend/firebase';

function ListingDetailsScreen({ route }) {
    const listing = route.params;
    const [, setEmail] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const db = firebase.firestore();

    // Fetch user details from Firebase
    const getUserInfo = async () => {
        try {
            const uid = listing.uid; // the uid for the listing
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


    // Fetch user location details
    const { city, country, location } = useCity(listing.location.latitude, listing.location.longitude)
 

    // Fetch user latitude and longtitude
    var lat = 0
    var long = 0;
    for (var property in location) {
        if (property === 'coords') {
            lat = location[property]['latitude'];
            long = location[property]['longitude'];
        }
    }
    // console.log(listing.phone)

    // Calculate distance between the users
    const dist = getDistanceFromLatLonInKm(lat, long, listing.location.latitude, listing.location.longitude)

    const caller = () => {
        Linking.openURL(`tel:${parseInt(phone)}`)
    }
    const sms = () => {
        Linking.openURL(`sms:${parseInt(phone)}`)
    }

    // Calculate the vector distance of current user and seller location
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
        var d = R * c; // Distance in kilo-metres
        return d;
    }

    var fname = String(name)
    fname = fname.split(" ")[0]

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    return (
        <View>
            <Image style={styles.image} source={{ uri: listing.imageURLs[0] }} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title} </AppText>
                {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 2,}}/> */}
                <AppText style={styles.price}>{'Price: $' + listing.price}</AppText>
                {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 2,}}/> */}
                <AppText style={styles.subtitle}>{'About this product: ' + listing.description} </AppText>
                {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 2,}}/> */}
                <AppText style={styles.subtitle}>{'Seller: ' + name} </AppText>
                {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 2,}}/> */}
                <AppText style={styles.subtitle}>{'Distance: ' + Math.round(dist) + ' kms away'}</AppText>
                {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 2,}}/> */}
                <AppText style={styles.subtitle}>{'Location: ' + city + ', ' + country}</AppText>
                {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 2,}}/> */}
                <AppText style={styles.subtitle}>{'Expiry Date: ' + listing.expdate}</AppText>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={caller}><MaterialCommunityIcons name='phone' color={colors.primary} size={22} /><AppText style={styles.text}>{'Call ' + fname}</AppText></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={sms}><MaterialCommunityIcons name='message' color={colors.primary} size={22} /><AppText style={styles.text}>{'SMS ' + fname}</AppText></TouchableOpacity>
                </View>
                {/* <Button onPress = {caller} title = {'Call ' + name} /> 
            <Button onPress = {sms} title = {'SMS ' + name} /> */}
                {/* <View style = {styles.userContainer}>
            <ListItem  image = {require("../assets/logo.png")} title = "Ansh"/>
            </View> */}
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    detailsContainer: {
        padding: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 25,
        color: 'blue'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        marginVertical: 5
    },
    subtitleText: {
        fontSize: 18,
        fontWeight: '300',
        color: 'black',
        marginVertical: 5
    },
    price: {
        marginVertical: 5,
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold'
    },
    userContainer: {
        marginVertical: 40
    },
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: 180,
        height: 45,
        marginVertical: 15,
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 5
    },
    text: {
        color: colors.primary,
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginLeft: 20

    },
    buttonContainer: {
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',

    }


})
export default ListingDetailsScreen;