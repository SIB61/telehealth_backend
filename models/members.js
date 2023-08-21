import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Members = new Schema({
  email: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  companyName: String,
  firstName: String,
  lastName: String,
  dob: Date,
  profilePicture: String,
  country: String,
  profileBio: String,
  specializations: Array,
  degree: String,
  license: String,
  active: Boolean,
  payoutAccount: String,
  calendlyId: String,
  languages: Array,
  sponsoredHours: Number,
  paymentInfo: String,
  matChups: Array,
});

export const member = mongoose.model("members", Members);
