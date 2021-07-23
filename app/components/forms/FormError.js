/*
* FormError.js
* Author: Sagar A. Chitnis
* Purpose: Export an `ErrorMessage` component used for displaying user facing
*          errors in forms for each field in a form
*/

import React from 'react';
import { StyleSheet } from 'react-native';

import AppText from '../Text';

function ErrorMessage({ error, visible }) {
    if (!visible || !error) return null;
    return (
        <AppText style={styles.error}>
            {error}
        </AppText>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red'
    }
})

export default ErrorMessage;