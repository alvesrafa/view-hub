import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import api from '../../services/api';
import SearchInput from '../../components/SearchInput';
import styled from 'styled-components';
import RepositoryView from '../../components/RepositoryView';

export default function Repositories(){
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);
  
  useEffect(()=> {
    loadRepositories()
  }, [])

  useEffect(()=> {
    setRepositories([])
    setPage(1)
  }, [search])

  async function loadRepositories() {
    if(search === null ||search === '' ) return ;

    if(loading) return ;

    if(total > 0 && repositories.length === total) return ;

    Keyboard.dismiss();
    setLoading(true)
    try {
      const response = await api.get('/search/repositories', {
        params: {
          q: search,
          sort: 'stars',
          order: 'desc',
          page: page,
          per_page: 10
        }
      })
      setTotal(response.data.total_count);
      
      setRepositories([...repositories, ...response.data.items]);

    }catch (e) {
      console.error(e)
    }


    setPage(page+1)
    setLoading(false)

  }


  return (
    <View style={styles.container}>
      <SearchInput value={search} set={setSearch} method={loadRepositories} />
      <RepositoryList 
        data={repositories}
        keyExtractor={(repository, id) => String(id)} 
        // showsVerticalScrollIndicator={false}
        onEndReached={loadRepositories}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={loading ? 
        //   <View style={{ height: 100}}>
        //     <LottieView
        //       resizeMode="contain"
        //       source={loadingIcon} 
        //       autoPlay loop
        //     />
        //   </View> : <></>
        // }
        renderItem={({item: repository}) => (
          <RepositoryView repository={repository}/>
        )}

      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
})
const RepositoryList = styled.FlatList`
  flex:1;
  background-color: #f1f8ff;
  padding: 3px 8px;
`
