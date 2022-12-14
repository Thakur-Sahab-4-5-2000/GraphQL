const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoDb = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log("Mongodb connected successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoDb;
