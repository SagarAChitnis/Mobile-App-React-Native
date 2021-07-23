/*
* UserProfileNavigator.js
* Author: Sagar A. Chitnis
* Purpose: Stack-based navigator for navigating the users account page which is a
*          collection of other screens
*/

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/Profile';
import MessagesScreen from '../screens/Messages';
import UserListingScreen from '../screens/UserItems';


const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Account' component={AccountScreen} />
        <Stack.Screen name='Messages' component={MessagesScreen} />
        <Stack.Screen name='My Listings' component={UserListingScreen} />
    </Stack.Navigator>
);

export default AccountNavigator;