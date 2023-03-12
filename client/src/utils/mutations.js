import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_MuscleGroup = gql`
  mutation addMuscleGroup($name: String!, $upperLower: Boolean!) {
    addMuscleGroup(name: $name, upperLower: $upperLower) {
      _id
      name
      createdAt
      username
      exerciseCount
      upperLower
      exercises     {
        _id
      }
    }
  }
`;

export const ADD_Exercise = gql`
  mutation ADD_Exercise($muscleGroupId: ID!, $name: String!, $pushPull: Boolean!) {
    addExercise(muscleGroupId: $muscleGroupId, name: $name, pushPull: $pushPull) {
      _id
      exerciseCount
      exercises {
        _id
        name
        createdAt
        username
        pushPull
      }
    }
  }
`;