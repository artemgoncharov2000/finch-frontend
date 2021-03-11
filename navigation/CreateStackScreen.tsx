import React, {FC, useState} from 'react';
import {Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateGuide from '../screens/main/create_guide/CreateGuide';
import CreateCard from '../screens/main/create_card/CreateCard';


const CreateStackScreen = () => {
  const CreateStack = createStackNavigator();
  return (
        <CreateStack.Navigator>
          <CreateStack.Screen 
            name="NewGuide" 
            component={CreateGuide}
            options={{
              
              headerRight: () => (
                <Button
                  onPress={() => alert('You created a new guide!')}
                  title="Create"
                  color="black"
                />
              ),
            }}
          />
          <CreateStack.Screen 
            name="NewCard" 
            component={CreateCard}
            options={{
              
              headerRight: () => (
                <Button
                  onPress={() => alert('You added a new card!')}
                  title="Create"
                  color="black"
                />
              ),
            }}
          />     
        </CreateStack.Navigator>
      
  );
};
export default CreateStackScreen
