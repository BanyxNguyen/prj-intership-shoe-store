import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../views/HomeScreen';
import DetailScreen from '../views/DetailScreen';
import ProductScreen from '../views/ProductScreen';
import ProfileScreen from '../views/ProfileScreen';
import WelcomeScreen from '../views/WelcomeScreen';
import LoginLogOutScreen from '../views/LoginLogOutScreen';

import {
  WELCOMESCREEN,
  HOMESCREEN,
  DETAILSCREEN,
  PROFILESCREEN,
  LOGINLOGOUTSCREEN,
} from './config';

const Tab = createBottomTabNavigator();

const HomeScreenTab: FC = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="WELCOMESCREEN"
        initialRouteName="HOMESCREEN" // dev
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={WELCOMESCREEN} component={WelcomeScreen} />
        <Stack.Screen name={HOMESCREEN} component={HomeScreenTab} />
        <Stack.Screen name={DETAILSCREEN} component={DetailScreen} />
        <Stack.Screen name={PROFILESCREEN} component={ProfileScreen} />
        <Stack.Screen name={LOGINLOGOUTSCREEN} component={LoginLogOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
