/*
* navigationTheme.js
* Author: Sagar A. Chitnis
* Purpose: Default theme for navigators
*/

import { DefaultTheme } from '@react-navigation/native';

import colors from '../config/colors';

export default {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        background: colors.white,
    },
};