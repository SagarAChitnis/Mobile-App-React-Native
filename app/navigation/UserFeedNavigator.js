/*
* UserFeedNavigator.js
* Author: Sagar A. Chitnis
* Purpose: Navigation between list of items and the detailed page for each item
*/

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ListingsScreen from '../screens/Items';
import ListingDetailsScreen from '../screens/ItemDetails';

const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator mode='modal' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Listings' component={ListingsScreen} />
        <Stack.Screen name='ListingDetails' component={ListingDetailsScreen} />
    </Stack.Navigator>
);

export default FeedNavigator;