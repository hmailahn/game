const { Schema } = require('mongoose');;
const dateFormat = require('../utils/dateFormat');

const exerciseSchema = new Schema(
    {
        name: {
            type: String,
            required: 'You need to write a name',
            minlength: 1,
            maxlength: 150
        },
        //push true pull false
        pushPull: {
            type: Boolean,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
          },
          username: {
            type: String,
            required: true
          },
    },
    {
        toJSON: {
          getters: true
        }
      }
);



module.exports = exerciseSchema;