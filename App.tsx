import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/auth/login/Login'
import Signup from './screens/auth/signup/Signup';
import  HomeScreen  from './screens/HomeScreen';
import ModalStackNavigator from './screens/ModalStackNavigator';



const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Singup" headerMode="none">
            <Stack.Screen name="Singup" component={Signup}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="ModalStackNavigator" component={ModalStackNavigator}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
