import React, { FC } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const GuidePreview = (props) => {
    return (
        <TouchableOpacity onPress={()=>{console.log("pressed")}}>
            <View
                style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    marginBottom: 20
                }}
            >
                <Image
                    source={require('../../assets/test/guide-preview.jpg')}
                    style={{
                        height: 180,
                        width: 374,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15
                    }}
                />
                <Text
                    style={{
                        fontStyle: 'normal',
                        fontWeight: "600",
                        fontSize: 22,
                        paddingHorizontal: 10,
                        paddingVertical: 5
                    }}
                >
                    Title
                        </Text>
                <Text
                    style={{
                        fontStyle: 'normal',
                        fontWeight: "400",
                        fontSize: 14,
                        color: "grey",
                        paddingHorizontal: 10,
                        paddingVertical: 5
                    }}
                >
                    Sub title
                        </Text>
            </View>
        </TouchableOpacity>

    );
}
export default GuidePreview;