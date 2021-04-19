import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeProfileScreen from '../../screens/main/profile/HomeProfileScreen';
import ProfileStackNavigator from '../ProfileStackNavigator';
import { TabRouter } from '@react-navigation/routers';
import GuideStackNavigator from '../GuideStackNavigator';

const HomeStackNavigator = ({route, navigation}) => {
    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator
            headerMode="none"
        >
            <HomeStack.Screen name="ProfileStack">
                {()=> <ProfileStackNavigator username="me" route={route} navigation={navigation}/>}
            </HomeStack.Screen>
            <HomeStack.Screen name="GuideStack" component={GuideStackNavigator}/>
        </HomeStack.Navigator>
    );
};
export default HomeStackNavigator;