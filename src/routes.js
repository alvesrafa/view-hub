import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/components/Home';
import Profile from './src/components/Profile';
import Repositories from './src/components/Repositories';

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Your profile" component={Profile} />
        <Drawer.Screen name="Repositories" component={Repositories} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}