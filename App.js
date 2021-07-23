/*
* App.js
* Authors: Group-W01/03-1
* Purpose: Main entry point to the Share-A-Snack application
*/


import React, { useState } from 'react';
import {
	StyleSheet,
	LogBox,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import OfflineNotice from './app/components/OfflineBanner';
import AuthNavigator from './app/navigation/AuthenticationNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import firebase from './app/backend/firebase';

import _ from 'lodash';

export default function App() {
	const [user, setUser] = useState();

	// Silence the timer warnings emerging from the Firebase library
	LogBox.ignoreLogs(['Setting a timer']);
	const _console = _.clone(console);
	console.warn = message => {
		if (message.indexOf('Setting a timer') <= -1) {
			_console.warn(message);
		}
	};

	// if the user is logged in then conditionally render the app navigator
	// where the user can interact with the app otherwise keep the user in the
	// auth navigator where they can either try and again or register
	firebase.auth().onAuthStateChanged((user) => {
		if (user != null) {
			setUser(true);
			console.log('We are authenticated now!');
		} else {
			setUser(false);
		}
	});

	return (
		<>
			{/* OfflineNotice appears on top of every screen */}
			<OfflineNotice />
			<NavigationContainer theme={navigationTheme}>
				{user ? <AppNavigator /> : <AuthNavigator />}
			</NavigationContainer>
		</>
	);
}


