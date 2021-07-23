/*
* ActionButton.js
* Author: Sagar A. Chitnis
* Purpose: Simple button with an associated action
*/

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors'

function FunctionButton({ title, onPress, color = 'primary', icon }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: 120,
        height: 10,
        marginVertical: 10,
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 5
    },
    container: {
        flex: 0,
        flexDirection: 'row',

    },
    text: {
        color: colors.primary,
        fontSize: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold'

    }
})
export default FunctionButton;