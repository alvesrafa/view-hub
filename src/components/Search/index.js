import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import api from '../../services/api';
import Constants from 'expo-constants';

export default function Home(){
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
          sort: 'stars',
          order: 'desc',
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

      <View style={styles.searchBlock}>
        <TextInput style={styles.searchInput} value={search} onChangeText={setSearch} />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text>Buscar</Text>
        </TouchableOpacity>
        <View>
          
        </View>
      </View>
      

      <ScrollView style={styles.Searched}>
        {
          repositories ? 
          repositories.map(repository => (

          <View style={styles.repository}>
            <Text style={styles.repositoryTitle}>
              {repository.owner.login}/{repository.name}
            </Text>
            <Text style={styles.repositoryDescription}>
              {repository.description}
            </Text>
            <View style={styles.repositoryFooter}>
              <Text>Stars{repository.stargazers_count}</Text>
              <Text>Language{repository.language}</Text>
              <Text>updated {repository.updated_at}</Text>
            </View>
          </View>

          ))
          :
          <Text>nada</Text>
        }
      </ScrollView>
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
  },


  repository: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: '#EEE',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
  },
  repositoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',

  },
  repositoryDescription: {
    marginVertical: 5,
    color: '#555',
  },
  repositoryFooter :{
    marginVertical: 5,
    flexDirection: 'row'
  },
})