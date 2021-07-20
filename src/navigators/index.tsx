import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../views/HomeScreen';
import ProfileScreen from '../views/ProfileScreen';
import WelcomeScreen from '../views/WelcomeScreen';
import DetailScreen from '../views/DetailScreen';
import LoginLogOutScreen from '../views/LoginLogOutScreen';

import {
  WELCOMESCREEN,
  HOMESCREEN,
  DETAILSCREEN,
  PROFILESCREEN,
  LOGINLOGOUTSCREEN,
} from './config';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="WELCOMESCREEN"
        initialRouteName="HOMESCREEN" // dev
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={WELCOMESCREEN} component={WelcomeScreen} />
        <Stack.Screen name={HOMESCREEN} component={HomeScreen} />
        <Stack.Screen name={DETAILSCREEN} component={DetailScreen} />
        <Stack.Screen name={PROFILESCREEN} component={ProfileScreen} />
        <Stack.Screen name={LOGINLOGOUTSCREEN} component={LoginLogOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
