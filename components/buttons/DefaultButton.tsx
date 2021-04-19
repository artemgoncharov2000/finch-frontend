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
        <View style={styles.container}>
            <TouchableOpacity  onPress={props.onPress}>
                <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DefaultButton;

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
       
        borderRadius: 14,
        
    },
    text: {
        fontWeight: "600",
        fontStyle: "normal",
        fontSize: 18,
        color: '#fff'
    }
})