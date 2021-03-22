import React, {FC} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Feed from '../screens/main/feed/Feed';
import Favorites from '../screens/main/favorites/Favorites';
import ProfileScreen from '../screens/main/profile/ProfileScreen';
//@ts-ignore 
import FeedIcon from '../assets/nav/feed-icon.svg'
//@ts-ignore
import FeedIconFilled from '../assets/nav/feed-icon-filled.svg'
//@ts-ignore 
import FavIcon from '../assets/nav/favorites-icon.svg'
//@ts-ignore
import FavIconFilled from '../assets/nav/favorites-icon-filled.svg'
//@ts-ignore
import ProfIcon from '../assets/nav/profile-icon.svg'
//@ts-ignore
import ProfIconFilled from '../assets/nav/profile-icon-filled.svg'

const Tab = createBottomTabNavigator()

const MainStackNavigator: FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Feed') {
                    return (
                        focused ? <FeedIconFilled fill="#000" width="26" height="26"/> : <FeedIcon fill="#000" width="26" height="26"/>
                    );
                } else if (route.name === 'Favorites') {
                    return (
                        focused ? <FavIconFilled fill="#000"  width="26" height="26"/> : <FavIcon fill="#000"  width="26" height="26"/>
                    );
                } else if (route.name === 'Profile') {
                    return (
                        focused ? <ProfIconFilled fill="#000" width="26" height="26"/> : <ProfIcon fill="#000" width="26" height="26"/> 
                    );
                }
                },
            })}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Feed" component={Feed}/>
            <Tab.Screen name="Favorites" component={Favorites}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
        
    );
}
export default MainStackNavigator

