import React, { FC, useState, useContext, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import FeedStackNavigator from './Feed/FeedStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import MainTabNavigator from './TabNavigator';
import CreateStackNavigator from './CreateStackNavigator';
import { restoreToken, signIn, signOut } from '../redux/actions/tokenActions';
import { connect } from 'react-redux';
import LocalStorage from '../local_storage/LocalStorage';
import { signUpUser, signInUser } from '../api/auth/authentification';
import SplashScreen from '../screens/auth/SplashScreen';
import EditProfileScreen from '../screens/main/profile/EditProfileScreen';
import ProfileOptionsScreen from '../screens/main/profile/ProfileOptionsScreen';
const RootStack = createStackNavigator();

const RootStackNavigator = ({ state, signIn, restoreToken }) => {


    return (
        <NavigationContainer>
            <RootStack.Navigator
                headerMode="none"
            >
                {state.isLoading ? (
                    <RootStack.Screen name="Splash" component={SplashScreen} />
                )

                    :

                    state.userToken == null ? (
                        <>
                            <RootStack.Screen name="SignUp" component={SignUpScreen} />
                            <RootStack.Screen name="SignIn" component={SignInScreen} />

                        </>
                    ) : (
                        <>
                            <RootStack.Screen name="MainTabScreen" component={MainTabNavigator} />
                            <RootStack.Screen name="CreateStackScreen" component={CreateStackNavigator} />
                            <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
                            <RootStack.Screen name="ProfileOptions" component={ProfileOptionsScreen} />
                        </>
                    )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

const mapStateToProps = (state: { tokenReducer: any; }) => {
    return {
        state: state.tokenReducer
    }
}


export default connect(mapStateToProps, null)(RootStackNavigator);
