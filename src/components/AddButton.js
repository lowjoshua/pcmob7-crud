import React from 'react'
import { Image, StyleSheet, TouchableOpacity, } from 'react-native'

const AddButton = ({ navigate }) => (
    <TouchableOpacity activeOpacity={0.6} onPress={() => navigate.navigate('AddTask')}>
        <Image source={require('../images/icons/add.png')} style={styles.addButton} />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    addButton: {
        marginRight: 10,
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
})

export default AddButton
