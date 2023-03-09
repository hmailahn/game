// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type MuscleGroup {
    _id: ID
    name: String
    upperLower: Boolean
    createdAt: String
    username: String
    exercises: [exercise]
  }

  type exercise {
    _id: ID
    name: String
    pushPull: Boolean
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    password: String
    email: String
    friendCount: Int
    muscleGroups: [MuscleGroup]
    friends: [User]
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    muscleGroups(username: String): [MuscleGroup]
    muscleGroup(_id: ID!): MuscleGroup
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addMuscleGroup(name: String!, upperLower: Boolean!): MuscleGroup
    addExercise(
      muscleGroupId: ID!
      name: String!
      pushPull: Boolean!
    ): MuscleGroup
    addFriend(friendId: ID!): User
    deleteUser(username: String! email: String!): Auth
  }
`;

// export the typeDefs
module.exports = typeDefs;

// wokrout {
//   muscle groups {
//     chest {
//       upperLower: true,
//       exerciseNames: {
//         name: 'Chest Fly',
//         pushPull: true
//       },
//     },
//     back {
//       upperLower: true,
//       exerciseNames: {
//         name: 'Row',
//         pushPull: false,
//       },
//     }
//   }
// }

// workout {
//   upper{
//     muscleGroups {
//       chest {
//         exerciseNames: {
//           name: 'Chest Fly',
//           pushPull: true
//         },
//       }
//     }
//   }
//   lower {
//     muscleGroups {
//       back {
//         exerciseNames: {
//         name: 'Row',
//         pushPull: false,
//       },
//       }
//     }
//   }
// }

// workout {
//   muscleGroups {
//     back {
//       upperLower: true,
//       exerciseNames: {
//         name: 'Row',
//         pushPull: false,
//       },
//       muscleGroup: {
//         id: 1,
//         name: back
//       }
//     }
//   }
// }
