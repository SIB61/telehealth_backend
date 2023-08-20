import mongoose from "mongoose";
export function connectDb() {
  const uri = process.env.DATABASE;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected…");
    })
    .catch((err) => console.log(err));
}
