import React, {FC, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/auth/login/Login'
import Signup from './screens/auth/signup/Signup';
import  MainStackScreen  from './navigation/MainStackScreen';
import CreateStackScreen from './navigation/CreateStackScreen'
import ProfileStackScreen from './navigation/ProfileStackScreen';


const RootStack = createStackNavigator();

const App = () => {
  const [isSigned, setIsSigned] = useState(false)
  return (
    <NavigationContainer>
      <RootStack.Navigator 
        headerMode="none"
        mode="modal"
      >
        {/* {isSigned ? (
          <>
            
          </>
        ) : (
          <>
            
            
          </>
        )} */}
        <RootStack.Screen name="Singup" component={Signup}/>
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="MainStackScreen" component={MainStackScreen}/>
        <RootStack.Screen name="CreateStackScreen" component={CreateStackScreen}/>
        <RootStack.Screen name="ProfileStackScreen" component={ProfileStackScreen}/>
        
      </RootStack.Navigator>
</NavigationContainer>
  );
};
export default App

