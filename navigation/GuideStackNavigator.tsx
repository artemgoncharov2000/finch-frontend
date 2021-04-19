import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GuideViewScreen from '../screens/main/guide/GuideViewScreen';
import CardViewScreen from '../screens/main/card/CardViewScreen';

const GuideStackNavigator = (props) => {
    const GuideStack = createStackNavigator();
    return (
        <GuideStack.Navigator
            headerMode="none"
        >
            <GuideStack.Screen name="Guide">
                {() => <GuideViewScreen props={props}/>}
            </GuideStack.Screen>
            <GuideStack.Screen name="Card">
                {(data) => <CardViewScreen props={data}/>}
            </GuideStack.Screen>
        </GuideStack.Navigator>
    )
}
export default GuideStackNavigator;