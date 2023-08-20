import mongoose from "mongoose";
const Schema = mongoose.Schema;

const matchups = new Schema({
  appointments: Array,
  providerId: String,
  memberId: String,
});

export const matchup = mongoose.model("matchups", matchups);

