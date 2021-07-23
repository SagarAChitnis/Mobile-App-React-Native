/*
* AuthenticationNavigator.js
* Author: Sagar A. Chitnis
* Purpose: Stack based navigator for when the user hasn't logged onto the app.
*          Allows for navigation between registration, login, and the welcome screen.
*/

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Login';
import WelcomeScreen from '../screens/Welcome';
import RegisterScreen from '../screens/Register';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

export default AuthNavigator;