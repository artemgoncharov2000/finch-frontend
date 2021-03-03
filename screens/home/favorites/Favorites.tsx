import React from 'react'
import {StyleSheet, Text, View, Image } from 'react-native';

const Favorites= () => {
    return (
        <View style={styles.container}>
            <Text>Future favorites</Text>
        </View>
    )
}

export default Favorites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})