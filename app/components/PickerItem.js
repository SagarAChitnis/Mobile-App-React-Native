/*
* PickerItem.js
* Author: Sagar A. Chitnis
* Purpose:Basic container for items in a picker modal
*/

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import AppText from './Text';

function PickerItem({ item, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppText style={styles.text}>{item.name}</AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        padding: 20
    }
})

export default PickerItem;