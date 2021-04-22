import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '../../screens/main/feed/FeedScreen';

import ProfileStackNavigator from '../ProfileStackNavigator';
import GuideStackNavigator from '../GuideStackNavigator';
import SearchScreen from '../../screens/main/search/SearchScreen';
import ReportScreen from '../../screens/main/report/ReportScreen';

const FeedStackNavigator = (props) => {
    const FeedStack = createStackNavigator();
    
    return (
        <FeedStack.Navigator
            headerMode="none"
        >
            <FeedStack.Screen name="FeedScreen" component={FeedScreen}/>  
            <FeedStack.Screen name="Report">
                {({navigation, route}) => {return <ReportScreen navigation={navigation} route={route}/>}}
            </FeedStack.Screen>
            <FeedStack.Screen name="GuideStack">
                {({navigation, route}) => <GuideStackNavigator navigation={navigation} route={route}/>}
            </FeedStack.Screen>
            <FeedStack.Screen name="ProfileStack">
                {({navigation, route}) => { return <ProfileStackNavigator navigation={navigation} username={route.params?.params.username}/>}}
            </FeedStack.Screen>
                
        </FeedStack.Navigator>
    );
};

export default FeedStackNavigator;