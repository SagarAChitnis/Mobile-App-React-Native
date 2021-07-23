/*
* ListItemDeleteAction.js
* Author: Sagar A. Chitnis
* Purpose: Export a button with trash can icon for deleting items
*/

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function ListItemDeleteAction({ onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons name='trash-can' size={35} color={colors.white} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.danger,
        width: 70,
    }
})

export default ListItemDeleteAction;