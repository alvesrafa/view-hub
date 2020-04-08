import * as React from 'react';
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Search from './components/Search';
import Profile from './components/Profile'; 
import Repositories from './components/Repositories';

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Search">
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="Your profile" component={Profile} />
        <Drawer.Screen name="Repositories" component={Repositories} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}