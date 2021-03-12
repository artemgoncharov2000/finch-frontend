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
                    borderRadius: 10,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    marginBottom: 20
                }}
            >
                <CameraIcon fill='black' height={30} width={30} />
                <Text style={{
                    paddingTop: 10
                }}
                >
                    Нажмите, чтобы добавить изображение
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default AddImageButtonLarge;
