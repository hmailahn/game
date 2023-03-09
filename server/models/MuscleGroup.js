const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const exerciseSchema = require("./exercise");

const muscleGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    //upper true, lower false
    upperLower: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    exercises: [exerciseSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const MuscleGroup = model("MuscleGroup", muscleGroupSchema);

module.exports = MuscleGroup;
