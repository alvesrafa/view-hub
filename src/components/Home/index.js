import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';

export default function Home(){
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <View style={styles.event}>
        <Image
          style={styles.eventProfileImage}
          source={{ uri: 'https://avatars1.githubusercontent.com/u/22660904?s=64&v=4' }}
        />
        <View style={styles.eventContent}>
          <Text style={styles.eventAction}>noomeDoCara action (user/repository from user/repository) data</Text>
          <View style={styles.eventRepo}>
            <Text>Title</Text>
            <Text>Description</Text>
          </View>
        </View>
        
      </View>
      <View style={styles.event}>
        <Image
          style={styles.eventProfileImage}
          source={{ uri: 'https://avatars1.githubusercontent.com/u/22660904?s=64&v=4' }}
        />
        <View style={styles.eventContent}>
          <Text style={styles.eventAction}>noomeDoCara action (user/repository from user/repository) data</Text>
          <View style={styles.eventRepo}>
            <Text>Title</Text>
            <Text>Description</Text>
          </View>
        </View>
        
      </View>
      <View style={styles.event}>
        <Image
          style={styles.eventProfileImage}
          source={{ uri: 'https://avatars1.githubusercontent.com/u/22660904?s=64&v=4' }}
        />
        <View style={styles.eventContent}>
          <Text style={styles.eventAction}>noomeDoCara action (user/repository from user/repository) data</Text>
          <View style={styles.eventRepo}>
            <Text>Title</Text>
            <Text>Description</Text>
          </View>
        </View>
        
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 5,
    flex:1,
    alignItems: 'center'
  },
  event: {
    width: '100%',
    borderTopColor: '#DDD',
    borderTopWidth: 1,
    padding: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',

    
  },
  eventProfileImage: {
    width: 50, 
    height: 50,
    borderRadius: 4,
    marginRight: 7,
  },
  eventContent: {
    width: '80%',
  },
  eventAction: {
    fontSize: 14,
  },
  eventRepo: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '100%',
    backgroundColor: '#EEE',
    borderRadius: 4,
    borderColor: '#DDD',
    borderWidth: 1,


  }
})