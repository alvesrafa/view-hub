import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import api from '../../services/api';
import SearchInput from '../SearchInput';
import styled from 'styled-components';

export default function Users(){
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);

  useEffect(()=> {
    loadUsers()
  }, [])

  useEffect(()=> {
    console.log('mudou, zera a lista')
    setUsers([])
    setPage(1)
  }, [search])

  async function loadUsers() {
    console.log('pagina', page)
    if(search === null ||search === '' ) return ;

    if(loading) return ;

    if(total > 0 && users.length === total) return ;

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
      setTotal(response.data.total_count);
      setUsers([...users, ...response.data.items]);

    }catch (e) {
      console.error(e)
    }


    setPage(page+1)
    setLoading(false)

  }
  return (
    <View style={styles.container}>
      <SearchInput value={search} set={setSearch} method={loadUsers} />
      <FlatList 
        style={{flex:1}}
        data={users}
        keyExtractor={user => String(user.login)} 
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
          <UserView >
            <ImageProfile source={{uri: user.avatar_url}}
            style={{width: 50, height: 50}} />
            <UserName>{user.login}</UserName>
          </UserView>
            
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
const UserList = styled.FlatList`
  width: 100%;
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
const UserView = styled.View`
  margin: 5px;
  padding: 13px 8px;
  background-color: #f1f8ff;
  border-radius: 4px;
  border: 1px solid #f6f8fa;
  flex-direction: row;
  align-items: center;
  box-shadow: 5px 5px 5px #000;

`
