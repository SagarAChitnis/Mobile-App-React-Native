/*
* Welcome.js
* Author: Sagar A. Chitnis
* Purpose: The first screen the user is presented with when the user starts the app
*          Allows navigation to registration and login
*/

import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';

import AppButton from '../components/Button';
import routes from '../navigation/routes';

function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground
            style={styles.background}
            blurRadius={2}
            source={require("../assets/welcomebk.jpg")}
        >
            <View style={styles.logoContainer}>

                <Image source={require('../assets/applogo2.png')} style={{ width: 250, marginTop: -20 }} />
                {/* <Text style={styles.header}>Share-A-Snack</Text>
                <Text style={styles.tagline}>Save Food. Share Food. Save the Planet</Text> */}
            </View>
            <View style={styles.buttonsContainer}>
                <AppButton title="Login" color='primary' onPress={() => navigation.navigate(routes.LOGIN)} />
                <AppButton title="Register" color='secondary' onPress={() => navigation.navigate(routes.REGISTER)} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: 'white'
    },
    buttonsContainer: {
        padding: 20,
        width: '100%',
        marginBottom: 50
    },
    logoContainer: {
        position: 'absolute',
        top: 40,
        alignItems: 'center'
    },
})

export default WelcomeScreen;