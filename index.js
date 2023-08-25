const express = require("express");
var bodyParser = require('body-parser');
const dotenv=require("dotenv");
const cors = require("cors");
const administrator=require("./models/administrators");
const app = express();
app.use(cors());
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json());

dotenv.config({path:"./config.env"});
require("./db/conn.js");

const payment=require("./routes/payment");
const admin=require("./routes/administrator");
app.use("/images",express.static("uploads"))

app.use("/payment",payment)
app.use("/admin",admin)

app.listen("5000", () => {
    console.log("Server is running!");
  });


