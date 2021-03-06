import React, {FC} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import CreatePost from './home/CreatePost/CreatePost';


const ModalStack= createStackNavigator()
const ModalStackNavigator: FC = () => {
    return (
        <ModalStack.Navigator 
            mode="modal"
            screenOptions={({route})=>{
                return {
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    ...TransitionPresets.ModalPresentationIOS
                }
            }}
            headerMode="none"
        >
            <ModalStack.Screen name="create"  component={CreatePost}/>
        </ModalStack.Navigator>
        
    );
}
export default ModalStackNavigator
