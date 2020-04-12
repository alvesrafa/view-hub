import React, { useState, useEffect } from 'react';
import { Alert, Keyboard } from 'react-native';
import api from '../../services/api';
import SearchInput from '../../components/SearchInput';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

export default function Users({ navigation }){
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);

  useEffect(()=> {
    loadUsers()
  }, [])

  useEffect(()=> {
    setUsers([])
    setPage(1)
  }, [search])

  async function loadUsers() {
    
    if(search === null ||search === '' ) return ;
    
    if(loading) return ;
    
    if(total > 0 && users.length === total) return ;

    Keyboard.dismiss();
    setLoading(true)
    try {
      const response = await api.get('/search/users', {
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
        return Alert.alert('Nenhum usuário encontrado com esse nome', 'Verifique o usuário e tente novamente.')
      } 

      setTotal(response.data.total_count);
      setUsers([...users, ...response.data.items]);

    }catch (e) {
      Alert.alert('Erro com a conexão', 'Verifique sua conexão com a internet e tente novamente.')
    }


    setPage(page+1)
    setLoading(false)

  }
  return (
    <Container>
      <SearchInput value={search} set={setSearch} method={loadUsers} />
      {
        users.length !== 0 ?
      <UserList 
        data={users}
        keyExtractor={(user, id) => String(id)} 
        // showsVerticalScrollIndicator={false}
        onEndReached={loadUsers}
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
        renderItem={({item: user}) => (
          <UserView onPress={() => navigation.navigate('Profile', {
            username: user.login
          })}>

            <ImageProfile source={{uri: user.avatar_url}}
            style={{width: 50, height: 50}} />

            <UserName>{user.login}</UserName>
           
          </UserView>
            
        )}
      />
      :
      <Main>
        <Ionicons name="ios-people" size={50} color="#DDD"/>
        <TextMain>Busque o usuário desejado no caixa de texto acima!</TextMain>
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
const UserList = styled.FlatList`
  flex:1;
  background-color: #f1f8ff;
`
const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-left: 4px;
`
const ImageProfile = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 7px;

`
const UserView = styled.TouchableOpacity`
  margin: 5px 20px;
  padding: 13px 8px;
  background-color: #fafbfc;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  border: 1px solid #DDD;

`
