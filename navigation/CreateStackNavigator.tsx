import React, { FC, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateGuide from '../screens/main/create_guide/CreateGuide';
import CreateCard from '../screens/main/create_card/CreateCard';


const CreateStackNavigator = (props) => {
  const CreateStack = createStackNavigator();
  
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen
        name="NewGuide"
        component={CreateGuide}
        options={({navigation, route}) => ({
          headerBackTitle: "Back",
          headerTitle: "New Guide"
        })}
      />
      <CreateStack.Screen
        name="NewCard"
        component={CreateCard}
        options={{
          headerBackTitle: "Back",
          headerTitle: "New Card"
        }}

      />
    </CreateStack.Navigator>

  );
};

export default (CreateStackNavigator)
