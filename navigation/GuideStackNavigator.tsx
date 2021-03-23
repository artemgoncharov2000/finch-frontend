import React, { FC, useEffect, useState } from 'react';
import { Button, Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import GuideView from '../screens/main/guide/GuideView';
import CardViewScreen from '../screens/main/card/CardViewScreen';

const GuideStackNavigator = (props) => {
    const GuideStack = createStackNavigator();
    useEffect(()=>console.log(props),[props])
    return (
        <GuideStack.Navigator
            headerMode="none"
            
        >
            <GuideStack.Screen name="GuideView">
                {() => <GuideView props={props}/>}
            </GuideStack.Screen>
            <GuideStack.Screen name="CardView">
                {(data) => <CardViewScreen props={data}/>}
            </GuideStack.Screen>
                
        </GuideStack.Navigator>
    );
};

export default GuideStackNavigator;