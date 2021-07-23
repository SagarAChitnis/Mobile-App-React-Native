/*
* UserCard.js
* Author: Sagar A. Chitnis
* Purpose: Container card for displaying user information
*/

import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import colors from '../config/colors';
import AppText from './Text';
import firebase from '../backend/firebase';


const db = firebase.firestore();

function UserCard({ title, imageUrl, onPress, docid }) {

    const deleteItemFromDb = () => {
        var img_ref = firebase.storage().refFromURL(imageUrl)
        var img_doc_ref = db.collection('listings').doc(docid);
        img_ref.delete().then(() => {
            img_doc_ref.delete()
            alert('Item Deleted')
        }).catch(function (error) {
            console.log(error)
            alert('Unable to delete item. Try again.')
        });
    }

    return (
        <View>

            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.card}>
                    <Image style={styles.image} source={{ uri: imageUrl }} />
                    <View style={styles.detailsContainer}>
                        <AppText numberOfLines={1} style={styles.text2}>{title}</AppText>
                        {/* <AppText numberOfLines={2} style = {styles.text2}>{subTitle}</AppText> */}
                        <TouchableOpacity style={styles.button} onPress={deleteItemFromDb}><AppText style={styles.text}>Delete</AppText></TouchableOpacity>
                        {/* <AppText style = {styles.subText}> {away}</AppText> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden',
        flexDirection: 'column'
    },
    image: {
        width: '100%',
        height: 200,
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: 'black',
        //flexDirection: 'row',
        //justifyContent: 'flex-end'
    },
    title: {
        marginBottom: 7,
    },
    button: {
        backgroundColor: '#E10A43',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: 70,
        height: 15,
        marginTop: 10,
        //marginHorizontal: 40,
    },
    text: {
        color: 'white',
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    text2: {
        //marginRight: 60  
        color: 'white'
    }
});

export default UserCard;
