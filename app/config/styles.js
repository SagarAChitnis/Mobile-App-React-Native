/*
* styles.js
* Author: Sagar A. Chitnis
* Purpose: Default style based on the platform that the app is run on
*/

import { Platform } from 'react-native';

import colors from './colors';

export default {
    text: {
        color: colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
    colors,
}
