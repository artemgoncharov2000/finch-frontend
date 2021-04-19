import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileStackNavigator from '../ProfileStackNavigator';
import GuideStackNavigator from '../GuideStackNavigator';
import FavoritesScreen from '../../screens/main/favorites/FavoritesScreen';

const FavoritesStackNavigator = (props) => {
    const FavoritesStack = createStackNavigator();
    
    return (
        <FavoritesStack.Navigator
            headerMode="none"
        >
            <FavoritesStack.Screen name="FavoritesScreen" component={FavoritesScreen}/>  
            <FavoritesStack.Screen name="GuideStack" component={GuideStackNavigator}/>
            <FavoritesStack.Screen name="ProfileStack">
                {({navigation, route}) => { return <ProfileStackNavigator navigation={navigation} route={route} username={route.params?.params.username}/>}}
            </FavoritesStack.Screen>
                
        </FavoritesStack.Navigator>
    );
};

export default FavoritesStackNavigator;