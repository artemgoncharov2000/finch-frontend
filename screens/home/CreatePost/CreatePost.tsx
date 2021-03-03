import React, {FC} from 'react'
import {StyleSheet, Text, View, Image } from 'react-native';

const CreatePost = () => {
    return (
        <View style={styles.container}>
            <Text>Future create post</Text>
        </View>
    )
}
export default CreatePost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
