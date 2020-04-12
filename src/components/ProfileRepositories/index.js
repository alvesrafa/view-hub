import React, { useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import api from '../../services/api';
import RepositoryView from '../RepositoryView';
import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components';

export default function ProfileRepositories({ username, total }){
  const [repositories, setRepositories] = useState([]);

  async function viewProfileOnGit() {
    await WebBrowser.openBrowserAsync(`https://github.com/${username}`);
  }

  async function loadRepo(){
    try {
      const response = await api.get(`/users/${username}/repos`, {
        params: {
          sort: 'pushed'
        }
      })
      if(response.data.length > 6)
        setRepositories(response.data.slice(0,6))
      else
        setRepositories(response.data)
        
    }catch(e) {
      Alert.alert('Erro com a conexão', 'Verifique sua conexão com a internet e tente novamente.')
    }
  }
  useEffect(()=> {
    loadRepo();
  }, [])
  return (
    <ScrollView>
      {repositories.map((repository, id) => (
        <RepositoryView key={id} repository={repository}/>
      ))}
      <ViewGit onPress={viewProfileOnGit}>
        <ButtonText>Ver perfil completo</ButtonText>
      </ViewGit>
    </ScrollView>
  )
}
const ViewGit = styled.TouchableOpacity`
  width: 100%;
  padding: 7px 10px;
  background-color: #0366d6;
  align-items: center;
  margin: 5px 0;
`
const ButtonText = styled.Text`
  color: #f1f8ff;
  font-size: 18px;
  line-height: 25px;
`