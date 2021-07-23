/*
* OfflineBanner.js
* Author: Sagar A. Chitnis
* Purpose: Display a banner if the user is not connected to the internet
*/

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

import colors from '../config/colors';

function OfflineNotice() {
    const netInfo = useNetInfo();

    // Only render if the user is not connected to WiFi and if is unable
    // to connect to Internet
    if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No Internet Connection</Text>
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        height: 50,
        position: 'absolute',
        zIndex: 1,
        top: Constants.statusBarHeight,
        width: "100%",
    },
    text: {
        color: colors.white,
    }
});

export default OfflineNotice;
