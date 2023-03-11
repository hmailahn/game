import { gql } from '@apollo/client';

export const QUERY_MuscleGroups= gql`
  query muscleGroups($username: String) {
    muscleGroups(username: $username) {
      _id
      name
      upperLower
      createdAt
      username
      exerciseCount
      exercises {
        _id
        createdAt
        username
        name
        pushPull
      }
    }
  }
`;

export const QUERY_User = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      muscleGroups {
        _id
        name
        upperLower
        exercises {
            name
            pushPull
        }
      }
    }
  }
`;

export const QUERY_MuscleGroup = gql`
  query muscleGroup($id: ID!) {
    muscleGroup(_id: $id) {
      _id
      name
      upperLower
      createdAt
      username
      exerciseCount
      exercises {
        _id
        createdAt
        username
        name
        pushPull
      }
    }
  }
`;