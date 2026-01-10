const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config;

const app = express();

app.use(cors());
app.use(express.json());


fetch('http://localhost:5000/api/payment/gcash', {
  body: JSON.stringify({amount:500, email: 'user@gmail.com'})
}) 


 return(

 )