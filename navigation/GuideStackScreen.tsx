import React, { FC, useEffect, useState } from 'react';
import { Button, Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import GuideView from '../screens/main/guide/GuideView';

const GuideStackScreen = (props) => {
    const GuideStack = createStackNavigator();
    useEffect(()=>console.log(props),[])
    return (
        <GuideStack.Navigator
            headerMode="none"
            
        >
            <GuideStack.Screen name="GuideView">
                {() => <GuideView props={props}/>}
            </GuideStack.Screen>
                
        </GuideStack.Navigator>
    );
};

export default GuideStackScreen;