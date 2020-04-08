import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import Constants from 'expo-constants';

export default function Home(){
  const [search, setSearch] = useState('');

  async function handleSearch() {
    if(search === null ||search === '' ) return ;

    try {
      const response = await api.get('/search/repositories', {
        params: {
          q: search,
          sort: 'stars',
          order: 'desc',
        }
      })
      console.log(response.data.total_count)
    }catch (e) {
      console.error(e)
    }
  }
  return (
    <View style={styles.container}>

      <View style={styles.searchBlock}>
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text>Buscar</Text>
        </TouchableOpacity>
      </View>
      

      <View style={styles.Searched}>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 5,
    flex:1,
    padding: 5,
  },
  searchBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  searchButton: {
    width: '15%',
    backgroundColor: '#DDD',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  searchInput: {
    width: '80%',
    height: 45,
    borderRadius: 8,
    backgroundColor: '#DDD',
    paddingHorizontal: 10,
    fontSize: 18,
    lineHeight: 20,
  }
})