import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '../../screens/main/feed/FeedScreen';

import ProfileStackNavigator from '../ProfileStackNavigator';
import GuideStackNavigator from '../GuideStackNavigator';
import SearchScreen from '../../screens/main/feed/SearchScreen';

const FeedStackNavigator = (props) => {
    const FeedStack = createStackNavigator();
    
    return (
        <FeedStack.Navigator
            headerMode="none"
        >
            <FeedStack.Screen name="FeedScreen" component={FeedScreen}/>  
            <FeedStack.Screen name="Search" component={SearchScreen}/>
            <FeedStack.Screen name="GuideStack" component={GuideStackNavigator}/>
            <FeedStack.Screen name="ProfileStack">
                {({navigation, route}) => { return <ProfileStackNavigator navigation={navigation} username={route.params?.params.username}/>}}
            </FeedStack.Screen>
                
        </FeedStack.Navigator>
    );
};

export default FeedStackNavigator;