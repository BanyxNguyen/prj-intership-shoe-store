import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  TABSHOP,
  TABDROPS,
  TABWISHLISH,
  SEARCHSCREEN,
  SHOWANDFILTERSCREEN,
  TABCARTSCREEN,
  CHECKOUTSCREEN,
} from './config';
import Icons, {TypeLibraryIcons} from '../components/Icons';
import HeaderHoc, {ChangeTitleHeader} from '../hocs/HeaderHoc';
import {navigationRef} from './navigationService';
import {colors, constants} from '../support/constants';
import SearchScreen from '../views/SearchScreen';
import ShowAndFilterScreen from '../views/ShowAndFilterScreen';
import WishlistScreen from '../views/WishlistScreen';
import CartScreen from '../views/CartScreen';
import CheckoutScreen from '../views/CheckoutScreen';
import {Text} from '../support/styledComponents';
import {IconCart, TabIconParams} from './support';

const Tab = createBottomTabNavigator();

export const InitTabBarNavigation = TABDROPS;

const HomeScreenTab: FC = () => {
  const _tabIcon =
    (data: TabIconParams) =>
    ({color}: any) => {
      const {name, lib, size} = data;
      return <Icons {...{name, lib, color, size}} />;
    };

  return (
    <Tab.Navigator
      initialRouteName={InitTabBarNavigation}
      tabBarOptions={{
        showLabel: false,
        style: {
          height: constants.hFooter,
        },
        activeTintColor: colors.black,
        inactiveTintColor: colors.blueyGrey,
      }}>
      <Tab.Screen
        name={TABDROPS}
        component={HomeScreen}
        options={{
          tabBarIcon: _tabIcon({
            name: 'fire',
            lib: 'MaterialCommunityIcons',
            size: 36,
          }),
        }}
        listeners={() => ({
          tabPress: ChangeTitleHeader(TABDROPS),
        })}
      />
      <Tab.Screen
        name={TABSHOP}
        component={ProductScreen}
        options={{
          tabBarIcon: _tabIcon({
            name: 'shopping-search',
            lib: 'MaterialCommunityIcons',
            size: 32,
          }),
        }}
        listeners={() => ({
          tabPress: ChangeTitleHeader(TABSHOP),
        })}
      />
      <Tab.Screen
        name={TABWISHLISH}
        component={WishlistScreen}
        options={{
          tabBarIcon: _tabIcon({
            name: 'heart-outline',
            lib: 'MaterialCommunityIcons',
            size: 32,
          }),
        }}
        listeners={() => ({
          tabPress: ChangeTitleHeader(TABWISHLISH),
        })}
      />
      <Tab.Screen
        name={TABCARTSCREEN}
        component={CartScreen}
        options={{
          tabBarIcon: ({color}) => (
            <IconCart
              data={{
                name: 'ios-cart-outline',
                lib: 'Ionicons',
                size: 32,
                color,
              }}
            />
          ),
        }}
        listeners={() => ({
          tabPress: ChangeTitleHeader(TABCARTSCREEN),
        })}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const AppNavigator: FC = () => {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          // initialRouteName="WELCOMESCREEN"
          initialRouteName="HOMESCREEN" // dev
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={WELCOMESCREEN} component={WelcomeScreen} />
          <Stack.Screen name={HOMESCREEN} component={HeaderHoc(HomeScreenTab)} />
          <Stack.Screen name={DETAILSCREEN} component={DetailScreen} />
          <Stack.Screen name={PROFILESCREEN} component={ProfileScreen} />
          <Stack.Screen name={LOGINLOGOUTSCREEN} component={LoginLogOutScreen} />
          <Stack.Screen name={SEARCHSCREEN} component={SearchScreen} />
          <Stack.Screen name={SHOWANDFILTERSCREEN} component={ShowAndFilterScreen} />
          <Stack.Screen name={CHECKOUTSCREEN} component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
