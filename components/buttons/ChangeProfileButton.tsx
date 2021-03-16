import React, { FC } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const { height, width } = Dimensions.get('screen');

interface Props {
    title: string,
    onPress: () => void;

}

const ChangeProfileButton: FC<Props> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChangeProfileButton;

const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: "#007AFF"
    },
    text: {
        fontWeight: "bold",
        color: '#007AFF'
    }
})