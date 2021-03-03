import React from 'react'
import {StyleSheet, Text, View, Image } from 'react-native';

const Feed = () => {
    return (
        <View style={styles.container}>
            <Text>Future feed</Text>
        </View>
    )
}

export default Feed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})