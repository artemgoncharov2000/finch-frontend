import React, { FC, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfileScreen from '../screens/main/profile/EditProfileScreen';
import UsersListScreen from '../screens/main/profile/UsersListScreen'
import ProfileOptionsScreen from '../screens/main/profile/ProfileOptionsScreen';
import { connect } from 'react-redux';
import userReducer from '../redux/reducers/userReducer';
import HomeProfileScreen from '../screens/main/profile/HomeProfileScreen';
import UserProfileScreen from '../screens/main/user/UserProfileScreen';


const ProfileStackNavigator = ({ username, user, route, navigation }) => {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator
      headerMode="none"
    >
      {
        username == 'me' || username === user.username
        ?
        <ProfileStack.Screen name="Profile">
          {({navigation}) => <HomeProfileScreen navigation={navigation} username={username}/>}
        </ProfileStack.Screen>
        :
        <ProfileStack.Screen name="Profile">
          {({navigation}) => <UserProfileScreen navigation={navigation} username={username}/>}
        </ProfileStack.Screen>
      }
      <ProfileStack.Screen
        name="Subscribers"
        options={({ navigation, route }) => ({
          headerBackTitle: "Back",
          headerTitle: "Subscribers"
        })}
      >
        {({navigation, route}) => <UsersListScreen type='Subscribers' navigation={navigation} route={route} username={username} />}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name="Subscriptions"
        options={({ navigation, route }) => ({
          headerBackTitle: "Back",
          headerTitle: "Subscriptions"
        })}
      >
        {({navigation, route}) => <UsersListScreen type='Subscriptions' navigation={navigation} route={route} username={username} />}
      </ProfileStack.Screen>

    </ProfileStack.Navigator>

  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps, null)(ProfileStackNavigator);