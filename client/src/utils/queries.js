import { gql } from '@apollo/client';

export const QUERY_MuscleGroups= gql`
  query muscleGroups($username: String) {
    muscleGroups(username: $username) {
      _id
      name
      upperLower
      createdAt
      username
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

export const QUERY_USER = gql`
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
        exercises {
            name
        }
      }
    }
  }
`;