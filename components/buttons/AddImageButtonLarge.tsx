import React, { FC } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
// @ts-ignore
import CameraIcon from '../../assets/icons/camera-icon.svg'
const { height, width } = Dimensions.get('screen');

interface Props {

    onPress: () => void;

}

const AddImageButtonLarge: FC<Props> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    
                    height: 180,
                    backgroundColor: 'rgba(60, 60, 67, 0.3)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                    marginBottom: 20
                }}
            >
                <CameraIcon fill='black' height={30} width={30} />
                <Text style={{
                    paddingTop: 10
                }}
                >
                    Tap to add an image
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default AddImageButtonLarge;
