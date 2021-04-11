import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserList from './views/UserList';
import UserForm from './views/UserForm';
import {Button, Icon} from 'react-native-elements';
import {UserProvider} from './context/usersContext';

const Stack = createStackNavigator();

export default props => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserList"
          screenOptions={screenOptions}>
          <Stack.Screen
            name="UserLis"
            component={UserList}
            options={({navigation}) => {
              return {
                title: 'Lista de Usuários',
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={<Icon name="add" size={25} color="white" />}
                    onPress={() => navigation.navigate('UserFom')}
                  />
                ),
              };
            }}
          />
          <Stack.Screen
            name="UserFom"
            component={UserForm}
            options={() => {
              return {
                title: 'Formulário de Usuários',
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};
const screenOptions = {
  headerStyle: {
    backgroundColor: '#f5411e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: '100',
  },
};
