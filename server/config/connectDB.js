const mongoose = require("mongoose");
require("colors");
require("dotenv").config();

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("➜ ".green, "Database name : ".bold, connect.connection.name);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
