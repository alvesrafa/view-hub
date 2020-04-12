import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import api from '../../services/api';
import RepositoryView from '../RepositoryView';

export default function ProfileRepositories({ username, total }){
  const [repositories, setRepositories] = useState([]);

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
      console.error('Erro', e)
    }
  }
  useEffect(()=> {
    loadRepo();
  }, [])
  return (
    <View>
      {repositories.map((repository, id) => (
        <RepositoryView key={id} repository={repository}/>
      ))}
    </View>
  )
}