/*
* KeyValueStore.js
* Author: Sagar A. Chitnis
* Purpose: Implements a key-value store in local AsyncStorage
*/

import { AsyncStorage } from '@react-native-community/async-storage';
import moment from 'moment';

const prefix = 'cache';
// Max age of items in cache in minutes
const expiryInMinutes = 5;

// Store an item in the cache alongside it's creation timestamp
const store = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now()
        }
        await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

// Check if item has expired i.e. is more than `expiryInMinutes` old
const isExpired = (item) => {
    const now = moment(Date.now());
    const storedTime = moment(item.timestamp);
    return now.diff(storedTime, 'minutes') > expiryInMinutes;
}

// Fetch an item from the cache if it is still valid
const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value);

        if (!item) return null;

        if (isExpired(item)) {
            await AsyncStorage.removeItem(prefix + key);
            return null;
        }

        return item.value;
    } catch (error) {
        console.log(error);
    }
}

export default {
    store
}
