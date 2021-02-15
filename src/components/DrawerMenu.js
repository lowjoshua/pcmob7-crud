import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { isAndroid } from '../utils'

const Menu = ({ onPress }) => isAndroid ? (
  <TouchableOpacity
    activeOpacity={.5}
    style={styles.wrapper}
    onPress={onPress}
  >
    <View style={[styles.line, styles.first]} />
    <View style={styles.line} />
    <View style={styles.line} />
  </TouchableOpacity>
) : null

const styles = StyleSheet.create({
  wrapper: {
    width: 30,
    height: 20,
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 2,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'white',
    marginTop: 6,
  },
  first: {
    marginTop: 0,
  }
})

export default Menu
