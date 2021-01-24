import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Main from './pages/Main';
import User from './pages/User';

const Routes = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#7319C1',
          }
        }}
       >
       <Stack.Screen name="Main" component={Main} />
       <Stack.Screen
        name="User"
        component={User}
        options={({ route }) => ({ title: route.params.user.name })}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
