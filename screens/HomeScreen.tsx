import React, {FC} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createSwitchNavigator, createAppContainer, StackRouter} from 'react-navigation'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Feed from './home/feed/Feed';
import CreatePost from './home/CreatePost/CreatePost';
import Favorites from './home/favorites/Favorites';
import Profile from './home/profile/Profile';



const Tab = createBottomTabNavigator()
const HomeScreen: FC = () => {
    return (
        // <View style={styles.container}>
        //     <View style={styles.navigation}>
        //         <Text>Navigation</Text>
        //     </View>
        //     <View style={styles.body}>
        //         <Text>Body</Text>
        //     </View>
        //     <View style={styles.footer}>
        //         <Text>Footer</Text>
        //     </View>
        // </View>
        
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Feed') {
                    return (
                        <Image source={require('../assets/nav/feed-icon.png')}/>
                    );
                } else if (route.name === 'CreatePost') {
                    return (
                        <Image source={require('../assets/nav/create-post-icon.png')}/>
                    );
                } else if (route.name === 'Favorites') {
                    return (
                        <Image source={require('../assets/nav/feed-icon.png')}/>
                    );
                } else if (route.name === 'Profile') {
                    return (
                        <Image source={require('../assets/nav/profile-icon.png')}/>
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
        backgroundColor: 'green'
    },
    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})
