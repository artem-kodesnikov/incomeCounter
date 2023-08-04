import { Schema, model } from 'mongoose';

const Income = new Schema({
  day: { type: String, required: true },
  dayNumber: { type: String, required: true },
  month: { type: String, required: true },
  hours: { type: Number, required: true },
  comment: { type: String, required: false }
});

export default model('Income', Income);
