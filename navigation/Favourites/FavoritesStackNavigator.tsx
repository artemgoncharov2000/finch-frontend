import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileStackNavigator from '../ProfileStackNavigator';
import GuideStackNavigator from '../GuideStackNavigator';
import FavoritesScreen from '../../screens/main/favorites/FavoritesScreen';
import ReportScreen from '../../screens/main/report/ReportScreen';

const FavoritesStackNavigator = (props) => {
    const FavoritesStack = createStackNavigator();
    
    return (
        <FavoritesStack.Navigator
            headerMode="none"
        >
            <FavoritesStack.Screen name="FavoritesScreen" component={FavoritesScreen}/>  
            <FavoritesStack.Screen name="Report">
                {({navigation, route}) => {return <ReportScreen navigation={navigation} route={route}/>}}
            </FavoritesStack.Screen>
            <FavoritesStack.Screen name="GuideStack">
                {({navigation, route}) => {return <GuideStackNavigator navigation={navigation} route={route}/>}}
            </FavoritesStack.Screen>
            <FavoritesStack.Screen name="ProfileStack">
                {({navigation, route}) => { return <ProfileStackNavigator navigation={navigation} route={route} username={route.params?.params.username}/>}}
            </FavoritesStack.Screen>
                
        </FavoritesStack.Navigator>
    );
};

export default FavoritesStackNavigator;