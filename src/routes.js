import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Repositories from './components/Repositories';
import Users from './components/Users';
const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Users" component={Users} />
        <Tab.Screen name="Repositories" component={Repositories} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}