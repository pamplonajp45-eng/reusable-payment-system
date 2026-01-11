// need muna mag import
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config;

const app = express();

app.use(cors());
app.use(express.json());

fetch("http://localhost:5000/api/payment/gcash", {
  body: JSON.stringify({ amount: 500, email: "user@gmail.com" }),
});

//icoconnect yung monggodb
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb: //localhost:27107/payment-gcash",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error", err));
