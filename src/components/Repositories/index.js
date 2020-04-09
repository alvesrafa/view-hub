import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import api from '../../services/api';
import Constants from 'expo-constants';
import SearchInput from '../SearchInput';

export default function Repositories(){
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [repositories, setRepositories] = useState('');

  async function handleSearch() {
    if(search === null ||search === '' ) return ;

    setTotal('');
    setRepositories('')
    try {
      const response = await api.get('/search/repositories', {
        params: {
          q: search,
        }
      })
      setTotal(response.data.total_count);
      setRepositories(response.data.items)

    }catch (e) {
      console.error(e)
    }
  }
  return (
    <View style={styles.container}>

      <SearchInput value={search} set={setSearch} method={handleSearch} />

      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
})