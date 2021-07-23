/*
* ImagePreview.js
* Author: Sagar A. Chitnis
* Purpose: Screen to view captured image
*/

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

function ViewImageScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.closeIcon}>
                <MaterialCommunityIcons name="close" color="white" size={40} />
            </View>
            <View style={styles.deleteIcon}>
                <MaterialCommunityIcons name="trash-can-outline" color="white" size={40} />
            </View>
            <Image style={styles.image} source={require('../assets/foodsave.jpg')} />
        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 400,
        position: 'absolute',
        top: 200
    },
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    closeIcon: {
        position: 'absolute',
        top: 40,
        left: 30,
    },
    deleteIcon: {
        position: 'absolute',
        top: 40,
        right: 30,
    }
})

export default ViewImageScreen;