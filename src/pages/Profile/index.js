import React from 'react';
import { View, Text } from 'react-native';

export default function({ route, navigation }){
  const { username } = route.params;
  return (
    <View>
      <Text>{ username }</Text>
    </View>
  )
}