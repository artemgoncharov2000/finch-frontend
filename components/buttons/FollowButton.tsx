import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props {
    isFollow: boolean | undefined,
    onChangeFollowHandle: () => void    
}

const FollowButton = (props: Props) => {
    
    return (
        <TouchableOpacity onPress={()=>{props.onChangeFollowHandle()}}>
            <View style={props.isFollow ? unfollowStyle.container : followStyle.container}>
                <Text style={props.isFollow ? unfollowStyle.text : followStyle.text}>{props.isFollow ? "Unfollow" : "Follow"}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FollowButton;

const followStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: "#007AFF",
        backgroundColor: "#007AFF"
    },
    text: {
        fontWeight: "bold",
        color: '#fff'
    }
})

const unfollowStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: "#007AFF"
    },
    text: {
        
        color: '#007AFF'
    }
})