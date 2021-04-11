import React, {createContext, useReducer} from 'react';
import users from '../data/user';

const initialState = {users};
const UsersContext = createContext({});

const actions = {
  deleteUser(state, action) {
    const user = action.payload;
    return {
      ...state,
      users: state.users.filter(u => u.id !== user.id),
    };
  },

  createUser(state, action){
    const user = action.payload;
    user.id = Math.random()
    return {
        ...state,
        users: [...state.users, user],
      };
  },
  updateUser(state, action){
    const updatedUser = action.payload;
    
    return {
        ...state,
        users: state.users.map(u=>u.id=== updatedUser.id ? updatedUser : u)
      };
  }
};
export const UserProvider = props => {
  function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
