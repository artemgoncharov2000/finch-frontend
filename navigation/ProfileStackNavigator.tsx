import React, { FC, useState } from 'react';
import { Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import EditProfileScreen from '../screens/main/profile/EditProfileScreen';
import UsersList from '../screens/main/profile/UsersList'
import ProfileOptionsScreen from '../screens/main/profile/ProfileOptionsScreen';


const ProfileStackNavigator = ({ route, navigation }) => {
  const CreateStack = createStackNavigator();
  const { destination } = route.params;
  return (
    <CreateStack.Navigator initialRouteName={destination}>
      <CreateStack.Screen
        name="ProfileDetails"
        component={EditProfileScreen}
        options={({ navigation, route }) => ({
          headerBackTitle: "Back",
          headerTitle: "Details"
        })}
      />
      <CreateStack.Screen 
        name="ProfileOptions"
        component={ProfileOptionsScreen}
        options={({ navigation, route }) => ({
          headerBackTitle: "Back",
          headerTitle: "Options"
        })}
      />
      <CreateStack.Screen
        name="Subscribers"
        options={({ navigation, route }) => ({
          headerBackTitle: "Back",
          headerTitle: "Subscribers"
        })}
      >
        {() => <UsersList type='Subscribers' />}
      </CreateStack.Screen>
      <CreateStack.Screen
        name="Subscriptions"
        options={({ navigation, route }) => ({
          headerBackTitle: "Back",
          headerTitle: "Subscriptions"
        })}
      >
        {() => <UsersList type='Subscriptions' />}
      </CreateStack.Screen>

    </CreateStack.Navigator>

  );
};
export default ProfileStackNavigator