import React, { FC, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateGuideScreen from '../screens/main/create_guide/CreateGuideScreen';
import CreateCardScreen from '../screens/main/create_card/CreateCardScreen';


const CreateStackNavigator = (props) => {
  const CreateStack = createStackNavigator();
  
  return (
    <CreateStack.Navigator
      headerMode="none"
    >
      <CreateStack.Screen
        name="NewGuide"
        component={CreateGuideScreen}
        options={({navigation, route}) => ({
          headerBackTitle: "Back",
          headerTitle: "New Guide"
        })}
      />
      <CreateStack.Screen
        name="NewCard"
        component={CreateCardScreen}
        options={{
          headerBackTitle: "Back",
          headerTitle: "New Card"
        }}

      />
    </CreateStack.Navigator>

  );
};

export default (CreateStackNavigator)
