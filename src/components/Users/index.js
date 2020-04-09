import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import api from '../../services/api';
import Constants from 'expo-constants';
import SearchInput from '../SearchInput';

export default function Users(){
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState('');

  async function handleSearch() {
    if(search === null ||search === '' ) return ;

    setTotal('');
    setRepositories('')
    try {
      const response = await api.get('/search/users', {
        params: {
          q: search,
          sort: 'stars',
          order: 'desc',
        }
      })
      setTotal(response.data.total_count);
      setUsers(response.data.items)

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