import React, {FC} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Feed from './home/feed/Feed';
import CreatePost from './home/CreatePost/CreatePost';
import Favorites from './home/favorites/Favorites';
import Profile from './home/profile/Profile';
//@ts-ignore 
import FeedIcon from '../assets/nav/feed-icon.svg'
//@ts-ignore 
import FavIcon from '../assets/nav/favorites-icon.svg'
//@ts-ignore
import ProfIcon from '../assets/nav/profile-icon.svg'
//@ts-ignore
import NewPostIcon from '../assets/nav/new-post-icon.svg'
import ModalStackNavigator from './ModalStackNavigator';

const Tab = createBottomTabNavigator()
const HomeScreen: FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Feed') {
                    return (
                        focused ? <FeedIcon fill="#fff"/> : <FeedIcon/>
                    );
                } else if (route.name === 'CreatePost') {
                    return (
                        <NewPostIcon/>
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
            <Tab.Screen name="CreatePost" component={CreatePost}/>
            <Tab.Screen name="Favorites" component={Favorites}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
        
    );
}
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    navigation: {
        flex: 2,
        
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        
    }
})
