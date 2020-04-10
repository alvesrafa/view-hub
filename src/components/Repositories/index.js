import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import api from '../../services/api';
import SearchInput from '../SearchInput';
import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons'

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
    console.log('mudou, zera a lista')
    setRepositories([])
    setPage(1)
  }, [search])

  async function loadRepositories() {
    console.log('pagina', page)
    if(search === null ||search === '' ) return ;

    if(loading) return ;

    if(total > 0 && repositories.length === total) return ;

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
      console.log(response.data.items)
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
          <RepositoryView >
            <AntDesign name="book" size={40} color="#DDD"/>
            <RepositoryInfo>
              <Title>{repository.owner.login}/{repository.name}</Title>
              <Description>{repository.description}</Description>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Stars>
                  <AntDesign name="star" size={16} color="#222"/>
                  {repository.stargazers_count}
                </Stars>
                <Language>
                  <AntDesign name="tool" size={16} color="#222"/>
                  {repository.language}
                </Language>
                <UpdateTime>{repository.updated_at}</UpdateTime>
              </View>
              
            </RepositoryInfo>
            
          </RepositoryView>
            
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
const RepositoryInfo = styled.View`
  width: 100%;
`
const Title = styled.Text`
  color: #0366d6;
  font-size: 22px;

`
const Description = styled.Text`
  color: #aaa;
  width: 100%;
  margin: 5px 0;

`
const Stars = styled.Text`

`
const Language = styled.Text`

`
const UpdateTime = styled.Text`

`
const RepositoryView = styled.View`
  flex-direction: row;
  margin: 4px 0;
  padding: 4px;
  background-color: #fafbfc;
  border-radius: 8px;
  border: 1px solid #DDD;
`
