const express = require("express");
var bodyParser = require('body-parser');
const dotenv=require("dotenv");
const cors = require("cors");
const administrator=require("./models/administrators");
const app = express();
var jsonParser = bodyParser.json();
dotenv.config({path:"./config.env"});
require("./db/conn.js");



app.listen("5000", () => {
    console.log("Server is running!");
  });


