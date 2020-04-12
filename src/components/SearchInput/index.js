import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import {Feather} from '@expo/vector-icons';

export default function SearchInput(props){
  return (
    <Container>
      <Feather name="github" size={56} color="#f6f8fa" />
      <Title>VIEW HUB</Title>

      <SearchBlock>
        <Input value={props.value} onChangeText={props.set} />
        <SearchButton  onPress={props.method}>
          <Feather name="search" size={32} color="#0366d6" />
        </SearchButton>
      </SearchBlock>

    </Container>
  )
}
const Container = styled.View`
  width: 100%;
  align-items:center;
  background-color: #24292E;
  padding: 13px 3px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`
const Title = styled.Text`
  font-size: 22px;
  margin: 13px;
  font-weight: bold;
  color: #f6f8fa;
`
const SearchBlock = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
const Input = styled.TextInput`
  border: 1px solid #f1f8ff;
  background-color: #fafbfc;
  width: 80%;
  height: 45px;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 18px;
  line-height: 20px;
`
const SearchButton = styled.TouchableOpacity`
  border: 1px solid #0366d6;
  width: 15%; 
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`
