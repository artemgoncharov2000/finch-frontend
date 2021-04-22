import React, {FC} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import FeedScreen from '../screens/main/feed/FeedScreen';
import FavoritesScreen from '../screens/main/favorites/FavoritesScreen';
import HomeProfileScreen from '../screens/main/profile/HomeProfileScreen';
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
//@ts-ignore
import SearchIcon from '../assets/icons/search-icon-1.svg';
//@ts-ignore
import SearchIconFilled from '../assets/icons/search-icon-filled.svg';
import FeedStackNavigator from './Feed/FeedStackNavigator';
import HomeStackNavigator from './Home/HomeStackNavigator';
import FavoritesStackNavigator from './Favourites/FavoritesStackNavigator';
import SearchScreen from '../screens/main/search/SearchScreen';
import SearchStackNavigator from './Search/SearchStackNavigator';

const Tab = createBottomTabNavigator()

const TabNavigator: FC = ({route, navigation}) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Feed') {
                    return (
                        focused ? <FeedIconFilled fill="#000" width="26" height="26"/> : <FeedIcon fill="#000" width="26" height="26"/>
                    );
                } else if (route.name === 'Search') {
                    return (
                        focused ? <SearchIconFilled fill="#000"  width="26" height="26"/> : <SearchIcon fill="#000"  width="26" height="26"/>
                    );
                }else if (route.name === 'Favorites') {
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
            <Tab.Screen name="Feed" component={FeedStackNavigator}/>
            <Tab.Screen name="Search" component={SearchStackNavigator}/>
            <Tab.Screen name="Favorites" component={FavoritesStackNavigator}/>
            <Tab.Screen name="Profile" component={HomeStackNavigator}/>
        </Tab.Navigator>
        
    );
}
export default TabNavigator

