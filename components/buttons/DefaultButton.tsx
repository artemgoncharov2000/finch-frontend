import React, { FC } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler'

const {height, width} = Dimensions.get('screen');

interface Props {
    title: string,
    onPress: () => void;

}

const DefaultButton: FC<Props> = (props) => {
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DefaultButton;

const styles = StyleSheet.create({
    container: {
        width: 375,
        height: 56,

        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
        paddingHorizontal: 30,
        paddingVertical: 17,
        borderRadius: 14,
    },
    text: {
        fontStyle: "normal",
        color: '#fff'
    }
})