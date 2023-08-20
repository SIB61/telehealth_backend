import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/conn.js";
import { createMember } from "./lib/member.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config({ path: "./config.env" });
connectDb();
app.post('members',createMember)
app.listen("5000", () => {
  console.log("Server is running!");
});
