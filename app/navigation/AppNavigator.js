/*
* AppNavigator.js
* Author: Sagar A. Chitnis
* Purpose: The main tabbed navigator used for navigation in the app once the user
*          has successfully logged onto the app
*/

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ListingEditScreen from '../screens/EditItem';
import FeedNavigator from './UserFeedNavigator';
import AccountNavigator from './UserProfileNavigator';
import CharityScreen from '../screens/Charities';

// BottomTabNavigator displays tabs at the bottom of the screen
const Tab = createBottomTabNavigator();

const AppNavigator = () => {

    return (
        <Tab.Navigator >
            <Tab.Screen name='Find Food' component={FeedNavigator} options={{
                tabBarIcon: ({ }) =>
                    <MaterialCommunityIcons name="food" color={'orange'} size={30} />
            }} />
            <Tab.Screen name='Add Food' component={ListingEditScreen} options={{
                tabBarIcon: () =>
                    <MaterialCommunityIcons name="plus-circle" color={'gold'} size={30} />
            }} />
            <Tab.Screen name='Donate' component={CharityScreen} options={{
                tabBarIcon: () =>
                    <MaterialCommunityIcons name="leaf" color={'#3FC060'} size={30} />
            }} />
            <Tab.Screen name='Account' component={AccountNavigator} options={{
                tabBarIcon: () =>
                    <MaterialCommunityIcons name="account" color={'dodgerblue'} size={30} />
            }} />

        </Tab.Navigator>
    );
};

export default AppNavigator;