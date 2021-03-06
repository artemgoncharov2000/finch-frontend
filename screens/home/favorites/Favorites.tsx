import React from 'react'
import {StyleSheet, Text, View, Image, Button } from 'react-native';

const Favorites= (props) => {
    return (
        <View style={styles.container}>
            <Text>Future favorites</Text>
            <Button title="modal" onPress={()=>{props.navigation.navigate("ModalStackNavigator")}}/>
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