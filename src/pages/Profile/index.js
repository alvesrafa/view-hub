import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import api from '../../services/api';

export default function({ route, navigation }){
  const { username } = route.params;
  async function loadUser(){
    try {
      const response = await api.get(`/users/${username}`)
      console.log(response.data)
    }catch (e){
      console.error('ERRO! ', e)
    }
  }
  useEffect(() => {

  }, [])
  return (
    <View>

      <Text>{ username }</Text>
    </View>
  )
}