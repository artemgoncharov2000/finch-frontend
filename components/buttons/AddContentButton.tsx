import React, { FC } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
// @ts-ignore
import CameraIcon from '../../assets/icons/camera-icon.svg'
// @ts-ignore
import TextIcon from '../../assets/icons/text-icon.svg'
const { height, width } = Dimensions.get('screen');

interface Props {
    type: string,
    onPress: () => void;

}

const AddContentButton: FC<Props> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    width: 100,
                    height: 50,
                    backgroundColor: '#007AFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    // shadowOffset: {
                    //     width: 0,
                    //     height: 2,
                    // },
                    // shadowOpacity: 0.2,
                    // shadowRadius: 10,
                    // marginBottom: 20
                }}
            >
                {
                    props.type === "text" 
                    ?
                    <TextIcon fill="white" height={20} width={20}/>
                    :
                    <CameraIcon fill='white' height={20} width={20} />
                }
            </View>
        </TouchableOpacity>
    )
}

export default AddContentButton;