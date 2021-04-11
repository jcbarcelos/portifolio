import React from 'react';
import {Text, View, FlatList} from 'react-native';
import users from '../data/user';
import {ListItem, Avatar} from 'react-native-elements';

export default props => {
  function fetUserItem({item: user}) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate('UserFom')}>
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="red" size={25} />
      </ListItem>
    );
  }
  return (
    <View>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={users}
        renderItem={fetUserItem}
      />
    </View>
  );
};
