import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { Keyboard, ActivityIndicator } from 'react-native';
import api from '../../services/api';


import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  User
} from './styles';

function Main({ navigation }) {


  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  const renderUserFromStorage = async () => {
    const response = await AsyncStorage.getItem('@users');
    if (response) {
      setUsers(JSON.parse(response))
    }
  }

  const updateUserFromStorage = async () => {
    await AsyncStorage.setItem('@users', JSON.stringify(users))
  }


  useEffect(() =>{
   renderUserFromStorage();
  }, [])

  useEffect(() =>{
    updateUserFromStorage();
  }, [users])

  async function handleNavigate(user) {
    navigation.navigate('User', { user })
  }

  async function handleSubmitAddUser() {

    setLoading(true);

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    }

    setUsers([...users, data]);
    setNewUser('');
    setLoading(false);

    Keyboard.dismiss();

  }

  return (
    <Container>
      <Form>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Adiciona usuário"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleSubmitAddUser}
        />

        <SubmitButton loading={loading} onPress={handleSubmitAddUser}>
          { loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>


            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>
                Ver Perfil
              </ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}


export default Main;
