import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
//@ts-ignore
import BackButtonIcon from '../../assets/icons/back-button-icon.svg';

const BackButton = ({navigation, color}) => {
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackButtonIcon fill={color} width="24" height="24"/>
        </TouchableOpacity>
    );
}

export default BackButton;

