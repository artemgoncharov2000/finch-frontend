import React, { FC } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler'

const {height, width} = Dimensions.get('screen');

interface Props {
    title: string,
    onPress: () => void;

}

const ChangeProfileButton: FC<Props> = (props) => {
    return(
        <View style={{padding: 10}}>
            <TouchableOpacity style={styles.container} onPress={props.onPress}>
                <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChangeProfileButton;

const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#A8B0BA"
    },
    text: {
        fontWeight: "bold",
        color: 'black'
    }
})