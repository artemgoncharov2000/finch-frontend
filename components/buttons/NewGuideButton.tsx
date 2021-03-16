import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//@ts-ignore
import PlusIcon from '../../assets/icons/plus-button-icon.svg';
const NewGuideButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.contrainer}>
                <PlusIcon fill="white" height="24" width="24"/>
            </View>
        </TouchableOpacity>

    )
}

export default NewGuideButton;

const styles = StyleSheet.create({
    contrainer: {
        height: 64,
        width: 64,
        backgroundColor: "#007AFF",
        borderRadius: 90,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
    }
})