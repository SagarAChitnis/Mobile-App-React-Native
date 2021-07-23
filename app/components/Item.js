/*
* Item.js
* Author: Sagar A. Chitnis
* Purpose: Custom component to list items allowing for vertical scrolling
*/

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './Text';

function CharityItems({ title, image, onPress, renderRightActions, IconComponent, onPress2 }) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight underlayColor='dodgerblue'>
                <View style={styles.container}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={styles.detailsContainer}>
                        <AppText numberOfLines={1}>{title}</AppText>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={onPress}><MaterialCommunityIcons name='phone' size={20} color='white' /></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onPress2}><MaterialCommunityIcons name='web' size={20} color='white' /></TouchableOpacity>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 25,
        backgroundColor: '#e5fbe5'
    },
    detailsContainer: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 15
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    },
    button: {
        backgroundColor: 'green',
        width: 60,
        borderRadius: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 0,
        marginHorizontal: 5

    }

})
export default CharityItems;