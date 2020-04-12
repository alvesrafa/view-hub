import React, { useState, useEffect } from 'react';
import { View, Alert, Keyboard } from 'react-native';
import api from '../../services/api';
import SearchInput from '../../components/SearchInput';
import styled from 'styled-components';
import RepositoryView from '../../components/RepositoryView';
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
      if(response.data.total_count === 0 ){
        setPage(page+1)
        setLoading(false)
        return Alert.alert('Nenhum repositório encontrado com esse nome.', 'Verifique e tente novamente.');
      } 
      
      setTotal(response.data.total_count);
      
      setRepositories([...repositories, ...response.data.items]);

    }catch (e) {
      Alert.alert('Erro com a conexão', 'Verifique sua conexão com a internet e tente novamente.')
    }


    setPage(page+1)
    setLoading(false)

  }


  return (
    <Container>
      <SearchInput value={search} set={setSearch} method={loadRepositories} />
      {
        repositories.length > 0 ?
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
      :
      <Main>
        <AntDesign name="book" size={50} color="#DDD"/>
        <TextMain>Busque o repositório desejado no caixa de texto acima!</TextMain>
      </Main>
    }
    </Container>
  )
}
const Container = styled.View`
  flex:1;
  background-color: #f1f8ff;
`
const Main = styled.View`
  flex:1;
  background-color: #f1f8ff;
  justify-content: center;
  align-items: center;
`
const TextMain = styled.Text`
  color: #AAA;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  width: 70%;
`
const RepositoryList = styled.FlatList`
  flex:1;
  background-color: #f1f8ff;
  padding: 3px 8px;
`
