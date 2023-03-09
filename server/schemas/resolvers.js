const { User, MuscleGroup } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("muscleGroups")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    muscleGroups: async (parent, { username }) => {
      const params = username ? { username } : {};
      return MuscleGroup.find(params).sort({ createdAt: -1 });
    },

    muscleGroup: async (parent, { _id }) => {
      return MuscleGroup.findOne({ _id });
    },

    users: async () => {
      return (
        User.find()
          // .select("-__v -password")
          .populate("friends")
          .populate("muscleGroups")
      );
    },

    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
         // .select("-__v -password")
        .populate("friends")
        .populate("muscleGroups");
    },
  },

  Mutation: {
    // addUser: async (parent, args) => {
    //   const user = await User.create(args);

    //   return user;
    // },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    deleteUser: async (parent, args) => {
      const user = await User.deleteOne(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect username");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },
    addMuscleGroup: async (parent, args, context) => {
      if (context.user) {
        const muscleGroup = await MuscleGroup.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { muscleGroups: muscleGroup._id } },
          { new: true }
        );

        return muscleGroup;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addExercise: async (parent, { muscleGroupId, name, pushPull }, context) => {
      if (context.user) {
        const updatedMuscleGroup = await MuscleGroup.findOneAndUpdate(
          { _id: muscleGroupId },
          {
            $push: {
              exercises: { name, pushPull, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedMuscleGroup;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    //future update: ability to add friend for user and friend - mutual adding
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
