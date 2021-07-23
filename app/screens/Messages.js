/*
* Messages.js
* Author: Sagar A. Chitnis
* Purpose: Display the list of messages for a user
*/

import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/Seperator';
import Screen from '../components/Screen';

const initialMessages = [
    {
        id: 1,
        title: 'Sagar Chitnis',
        description: 'Hi!',
        image: require('../assets/benjerry.jpeg')
    },
    {
        id: 2,
        title: 'JP Morgan',
        description: 'Hello!',
        image: require('../assets/foodsave.jpg')
    },
]

function MessagesScreen(props) {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = message => {
        //Delete the message from messages
        //Call the server
        setMessages(messages.filter(m => m.id !== message.id));
    }
    return (
        <Screen>
            <FlatList
                data={messages}
                keyExtractor={message => message.id.toString()}
                renderItem={({ item }) => <ListItem title={item.title} description={item.description} image={item.image} onPress={() => console.log('Message selected', item)} renderRightActions={() => <ListItemDeleteAction onPress={() => handleDelete(item)} />} />}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => { setMessages(initialMessages) }} />
        </Screen>
    );
}

export default MessagesScreen;