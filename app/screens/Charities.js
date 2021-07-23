/*
* Charities.js
* Author: Sagar A. Chitnis
* Purpose: Display the list of participating charities
*/

import React from 'react';
import { StyleSheet, View, FlatList, Linking, Image } from 'react-native';

import Screen from '../components/Screen'
import Icon from '../components/Icon';
import ListItemSeparator from '../components/Seperator';
import CharityItems from '../components/Item';
import colors from '../config/colors';

/*
* List of charities available in the app
*/
const menuItems = [
    {
        title: 'FareShare',
        icon: {
            name: 'hamburger',
            backgroundColor: 'gold'
        },
        phone: '0394280044',
        website: 'www.fareshare.net.au/'
    },
    {
        title: 'OzHarvest',
        icon: {
            name: 'food-apple',
            backgroundColor: colors.primary
        },
        phone: '0399995070',
        wesbite: 'www.ozharvest.org/'
    },
    {
        title: 'SecondBite',
        icon: {
            name: 'food',
            backgroundColor: 'dodgerblue'
        },
        phone: '0393763800',
        website: 'www.secondbite.org/'
    }
]

function CharityScreen({ }) {

    // console.log('enter')
    // const caller = () => {
    //     Linking.openURL(`tel:${parseInt('034459082')}`)
    // }

    return (
        <Screen style={styles.screen}>

            <View style={styles.container2}>
                <Image style={styles.logo} source={require('../assets/charity.png')} />
            </View>
            {/* <View style = {styles.head}>
                <AppText style = {styles.text}>
                {'Donate to a Charity   '}
                <MaterialCommunityIcons name = 'leaf' size = {25} color = 'green' margin = {50} position = 'relative' /> 
                </AppText>
                </View> */}
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) => <CharityItems title={item.title} IconComponent={<Icon name={item.icon.name}
                        backgroundColor={item.icon.backgroundColor} />}
                        onPress={() => Linking.openURL(`tel:${(item.phone)}`)}
                        onPress2={() => Linking.openURL(`https:${(item.website)}`)}
                    />
                    }
                />
            </View>
        </Screen>

    );
}

const styles = StyleSheet.create({
    container2: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        marginVertical: 10
    },
    screen: {
        backgroundColor: 'white'
    },
    head: {
        marginVertical: 10,
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 50,
        marginTop: 40
    },
    text: {
        fontSize: 30,
        backgroundColor: 'lightyellow',
        color: 'grey',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 70,
        marginBottom: 30
    }
})

export default CharityScreen;