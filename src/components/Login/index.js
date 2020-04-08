import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  
  async function handleLogin(){

  }
  return (
    <View style={styles.container}>

      <TextInput style={styles.input} placeholder="Username or Email" placeholderTextColor="#555" value={userName} onChangeText={setUserName} />

      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#555" secureTextEntry={true} value={pass} onChangeText={setPass} />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text>Entrar</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 250,
    backgroundColor: '#DDD',
    height: 45,
    padding: 8,
    margin: 10,
    borderRadius: 8,
    lineHeight: 20,
    fontSize: 16,
  },
  button: {
    height: 40,
    borderRadius: 5,
    backgroundColor: '#DDD',
    width: 100,

    justifyContent: 'center',
    alignItems: 'center',
  }
})