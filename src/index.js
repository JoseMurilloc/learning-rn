import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

import React from 'react';
import './config/ReactotronConfig';

import Routes from './routes'

const App = () => (
  <>
    <StatusBar backgroundColor="#7319C1" barStyle="light-content" />
    <Routes />
  </>
);

export default App;
