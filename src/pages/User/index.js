import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import {
  Container,
  Header,
  Bio,
  Avatar,
  Name,
  Starred,
  OwnerAvatar,
  Info,
  Author,
  RespositoriesStarred,
  Title
} from './style';

function User ({ route: { params }}) {
  const [respositories, setRespositories] = useState([]);
  const [user, setUser] = useState({});

  const renderRespositoriesStarred = async () => {
    const response = await api.get(`/users/${params.user.login}/starred`)
    setRespositories(response.data);
  }


  useEffect(() => {
    renderRespositoriesStarred();
    setUser(params.user)
  }, [])

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <RespositoriesStarred
        data={respositories}
        keyExtractor={repository => String(repository.id)}
        renderItem={({ item }) => (
          <Starred>
            <OwnerAvatar source={{ uri: item.owner.avatar_url}} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}

export default User;
