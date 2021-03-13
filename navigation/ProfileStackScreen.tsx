import React, {FC, useState} from 'react';
import {Button} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileDetails from '../screens/main/profile/ProfileDetails';



const ProfileStackScreen = () => {
  const CreateStack = createStackNavigator();
  return (
        <CreateStack.Navigator>
          <CreateStack.Screen 
            name="ProfileDetails" 
            component={ProfileDetails}
            
            options={{
      
              headerRight: () => (
                <Button
                  onPress={() => alert('You updated profile!')}
                  title="Save"
                  color="#007AFF"
                />
              ),
              headerBackTitle: "Back",
              headerTitle: "Details"
            }}
          />     
        </CreateStack.Navigator>
      
  );
};
export default ProfileStackScreen