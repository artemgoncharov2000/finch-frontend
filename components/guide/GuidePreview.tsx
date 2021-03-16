import React, { FC } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../api/baseURL';

interface Props {
    title: string,
    imageId?: string,
    subTitle: string,
    onPress: () => void
}


const GuidePreview : FC<Props> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
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
                    margin: 20
                }}
            >
                <Image
                    source={{uri: BASE_URL + '/i/' + props.imageId}}
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
                    {props.title}
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
                    {props.subTitle}
                </Text>
            </View>
        </TouchableOpacity>

    );
}
export default GuidePreview;