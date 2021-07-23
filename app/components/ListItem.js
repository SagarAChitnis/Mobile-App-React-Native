/*
* ListItem.js
* Author: Sagar A. Chitnis
* Purpose: Export a container that is used for each item in the product list
*/

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './Text';
import colors from '../config/colors';

function ListItem({ title, description, image, IconComponent, onPress, renderRightActions, normalText, expdate }) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            {title && <AppText style={styles.title} numberOfLines={1} >{title}</AppText>}
            {normalText && <AppText style={styles.text} numberOfLines={1} >{normalText}</AppText>}
            {description && <AppText style={styles.description} numberOfLines={2}>{description}</AppText>}
            {expdate && <AppText style={styles.title} numberOfLines={2}>{expdate}</AppText>}
          </View>
          {normalText && <MaterialCommunityIcons color={colors.medium} name='chevron-right' size={25} />}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.light
  },
  description: {
    color: colors.black,
    flex: 1,
    flexWrap: 'wrap',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center'
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10
  },

  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 10
  },
  text: {
    fontWeight: '500'
  }
})
export default ListItem;