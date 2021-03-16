import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../api/baseURL';

interface Props {
    title: string,
    uri: string
}

const CardPreview = (props: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.image} source={{uri: BASE_URL + '/i/' + props.uri}}/>
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CardPreview;

const styles = StyleSheet.create({
    container: {
        margin: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        
    },
    image: {
        height: 100,
        width: 375,
        borderRadius: 15
    },
    title: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        fontSize: 24,
        fontWeight: "600",
        color: "black"
    }
})