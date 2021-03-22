import React, { FC, useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store'
import RootStackNavigator from './navigation/RootStackNavigator';


const store = configureStore;

const App = () => {
  return (
    <Provider store={store()}>
      <RootStackNavigator/>
    </Provider>
  );
};
export default App

