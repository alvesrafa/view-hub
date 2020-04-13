import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import api from '../../services/api';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import ProfileRepositories from '../../components/ProfileRepositories';


export default function({ route, navigation }){
  const { username } = route.params;
  const [user, setUser] = useState({});

  async function loadUser(){
    try {
      const response = await api.get(`/users/${username}`)
      

      setUser(response.data)
    }catch (e){
      console.error('ERRO! ', e)
    }
  }
  useEffect(() => {
    loadUser();
  }, [])
  return (
    <>
    {user ? 
    <View style={{flex: 1, backgroundColor: '#f1f8ff'}}>
    
      <Header>
        <UserHeader>
          <UserImage
            source={{uri: user.avatar_url}}
          />
          <View>
            <Name>{ user.name }</Name>
            <ColorHeader >{ user.login }</ColorHeader>

            <Follow >
              <ColorHeader style={{marginRight: 15}}>Seguindo { user.following }</ColorHeader>
              <ColorHeader>Seguidores { user.followers }</ColorHeader>
            </Follow>
          </View>

        </UserHeader>
        <Bio>{ user.bio }</Bio>
        
        <Follow style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ColorHeader> 
            <Feather name="map-pin" size={18} color="#AAA" /> 
            { user.location }
          </ColorHeader>
          <ColorHeader> 
            <Feather name="link" size={18} color="#AAA" /> 
            { user.blog }
          </ColorHeader>
          <ColorHeader>{ user.company }</ColorHeader>
        </Follow>
        
      </Header>
      <ProfileRepositories username={username} total={user.public_repos}/>

    </View>
    :
    <Text>Icon carregando</Text>}
    </>
    
  )
}
const Header = styled.View`
  padding: 5px;
  background-color: #2d3339;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`
const ColorHeader = styled.Text`
  color: #CCC;
`
const UserHeader = styled.View`
  flex-direction: row;
  align-items: center;
`
const Bio = styled.Text`
  color: #AAA;
  margin: 1px 0 7px 0;
  padding: 0 5px;
`
const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #EEE;
`
const UserImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin: 10px 20px 3px 8px;
  border: 4px solid #DDD;
`
const Follow = styled.View`
  justify-content: space-around;
  flex-direction: row;

`