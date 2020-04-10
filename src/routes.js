import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Repositories from './components/Repositories';
import Users from './components/Users';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Users') {
            iconName = focused
              ? 'user-circle'
              : 'user-circle-o';
          } else if (route.name === 'Repositories') {
            iconName = focused ? 'code' : 'book';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0366d6',
        inactiveTintColor: '#24292e ',
      }}
      >
        <Tab.Screen name="Users" component={Users} />
        <Tab.Screen name="Repositories" component={Repositories} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}