import React, {useContext} from 'react';
import {View, FlatList, Alert} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import UsersContext from '../context/usersContext';

export default props => {
  keyExtractor = (item, index) => index.toString();
  const {state, dispatch} = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
        },
      },
      {
        text: 'Não',
      },
    ]);
  }
  function fetUserItem({item: user}) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate('UserFom', user)}>
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          onPress={() => props.navigation.navigate('UserFom', user)}
          iconProps={{name: 'edit'}}
          iconStyle={{fontSize: 25, color: 'orange'}}
        />
        <ListItem.Chevron
          onPress={() => confirmUserDeletion(user)}
          iconProps={{name: 'delete'}}
          iconStyle={{fontSize: 25, color: 'red'}}
        />
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={state.users}
        renderItem={fetUserItem}
      />
    </View>
  );
};
