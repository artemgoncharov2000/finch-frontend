import React, {FC} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Feed from '../screens/main/feed/Feed';
import Favorites from '../screens/main/favorites/Favorites';
import Profile from '../screens/main/profile/Profile';
//@ts-ignore 
import FeedIcon from '../assets/nav/feed-icon.svg'
//@ts-ignore 
import FavIcon from '../assets/nav/favorites-icon.svg'
//@ts-ignore
import ProfIcon from '../assets/nav/profile-icon.svg'

const Tab = createBottomTabNavigator()
const MainStackScreen: FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Feed') {
                    return (
                        focused ? <FeedIcon fill="#fff"/> : <FeedIcon/>
                    );
                } else if (route.name === 'Favorites') {
                    return (
                        focused ? <FavIcon fill="#fff"/> : <FavIcon/>
                    );
                } else if (route.name === 'Profile') {
                    return (
                        <ProfIcon/>
                    );
                }
                },
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Feed" component={Feed}/>
            <Tab.Screen name="Favorites" component={Favorites}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
        
    );
}
export default MainStackScreen

