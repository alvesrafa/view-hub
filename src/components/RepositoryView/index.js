import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser';

export default function RepositoryView({repository}){

  async function viewRepoOnGit() {
    await WebBrowser.openBrowserAsync(`https://github.com/${repository.owner.login}/${repository.name}`);
  }

  function countTime(time){

    let update = new Date(time);
    let now = new Date();
    let diaAgora = now.getDate(),
    mesAgora = now.getMonth(),
    anoAgora = now.getFullYear(),
    horaAgora = now.getHours();
    let diaUpdate = update.getDate(),
    mesUpdate = update.getMonth(),
    anoUpdate = update.getFullYear(),
    horaUpdate = update.getHours();

    if(anoAgora - anoUpdate !== 0) return (anoAgora - anoUpdate)+' years';
    if(mesAgora - mesUpdate !== 0) return (mesAgora - mesUpdate)+' months';
    if(diaAgora - diaUpdate !== 0) return (diaAgora - diaUpdate)+' days';
    if(horaAgora - horaUpdate !== 0) return (horaAgora - horaUpdate)+' hours';

    return '---';
  }

  return (
    <Repository >
      <AntDesign name="book" size={36} color="#DDD"/>
      <RepositoryInfo onPress={viewRepoOnGit}>
        <Title>{repository.owner.login}/{repository.name}</Title>
        <Description>{(repository.description)}</Description>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Stars>
            <AntDesign name="star" size={16} color="#222"/> 
              {repository.stargazers_count}
          </Stars>
          <Language>
            <AntDesign name="tool" size={16} color="#ffd33d"/>
            {repository.language}
          </Language>
          
          <UpdateTime>Updated {countTime(repository.updated_at)} ago</UpdateTime>
        </View>
        
      </RepositoryInfo>
      
    </Repository>
  )
}
const RepositoryInfo = styled.TouchableOpacity`
  width: 85%;
`
const Title = styled.Text`
  color: #0366d6;
  font-size: 20px;

`
const Description = styled.Text`
  color: #333;
  width: 100%;
  margin: 5px 0;

`
const Stars = styled.Text`
  color: #444;
`
const Language = styled.Text`
  color: #444;
`
const UpdateTime = styled.Text`
  color: #bbb;
`
const Repository = styled.View`
  flex-direction: row;
  margin: 4px 0;
  padding: 4px;
  background-color: #fafbfc;
  border-radius: 8px;
  border: 1px solid #DDD;
`
