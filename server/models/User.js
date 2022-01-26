const { Schema, model } = require('mongoose');
const Profession = require('./Profession');

const schema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  completedMeetings: Number,
  image: String,
  profession: {
    type: Schema.Types.ObjectId,
    ref: 'Profession',
  },
  qualities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quality',
    },
  ],
  rate: Number,
  sex: { type: String, enum: ['male', 'female', 'other'] },
});

module.exports = model('User', schema);