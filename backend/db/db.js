const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connected to MongoDb");
  } catch (err) {
    console.log("err with mongodb", err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
