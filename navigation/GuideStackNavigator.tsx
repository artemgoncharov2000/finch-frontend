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
                {({navigation, route}) => {
                    console.log(route);
                    return <GuideViewScreen navigation={navigation} route={route}/>
                }}
            </GuideStack.Screen>
            <GuideStack.Screen name="Card">
                {({navigation, route}) => <CardViewScreen navigation={navigation} route={route}/>}
            </GuideStack.Screen>
        </GuideStack.Navigator>
    )
}
export default GuideStackNavigator;