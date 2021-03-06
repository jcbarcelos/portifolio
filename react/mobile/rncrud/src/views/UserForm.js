import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import UsersContext from '../context/usersContext';


export default ({route, navigation}) => {
  const [user, setUser] = useState(route.params ? route.params : {});
  const {dispatch} =  useContext(UsersContext)
  return (
    <View style={styles.form}>
      <Input
        placeholder="Informe o Nome"
        label="Nome"
        style={styles.Input}
        onChangeText={name => setUser({...user, name})}
        value={user.name}
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Input
        placeholder="Informe o  E-mail"
        label="E-mail"
        onChangeText={email => setUser({...user, email})}
        value={user.email}
        leftIcon={<Icon name="envelope" size={24} color="black" />}
      />
      <Input
        placeholder="Informe o  Avatar"
        label="Avatar"
        leftIcon={<Icon name="user-circle" size={24} color="black" />}
        onChangeText={avatarUrl => setUser({...user, avatarUrl})}
        value={user.avatarUrl}
      />
      <Button title="Salvar"  onPress={()=> {
        dispatch({
          type: user.id ? 'updateUser' : 'createUser',
          payload: user
        })
            navigation.goBack();
      }} />
    </View>
  );
};
const styles = StyleSheet.create({
  form: {
    padding: 12
  },
  Input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    marginBottom: 10
  }
});
