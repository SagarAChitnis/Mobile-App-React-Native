/*
* Seperator.js
* Author: Sagar A. Chitnis
* Purpose: Seperator between different list items
*/

import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../config/colors';

function ListItemSeparatorComponent(props) {
    return (
        <View style={styles.separator} />
    );
}

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: colors.light,
    }
})

export default ListItemSeparatorComponent;