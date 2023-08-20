import mongoose from "mongoose";
const Schema = mongoose.Schema;

const careProviders = new Schema({
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
  languages: Array,
  sponsoredHours: Number,
  paymentInfo: String,
  matChups: Array,
});

export const careProvider = mongoose.model("careproviders", careProviders);

