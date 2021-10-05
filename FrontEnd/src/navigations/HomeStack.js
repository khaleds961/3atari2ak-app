import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/home';
import Reviews from '../screens/reviews';
import Profile from '../screens/profile';
import MyRides from '../screens/myrides';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyRides" component={MyRides} />


    </Stack.Navigator>
  );
}