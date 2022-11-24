//const mongodb = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();
// const mongoURI = "mongodb://localhost:27017" + "/covidtally"

let mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { tallySchema } = require("./schema");

const connectDb = async () => {
  try {
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    collection = await client.db("covidState").collection("covidtallies");

    return collection;
  } catch (error) {
    console.log("error while connection", error);
  }
};

module.exports.connectDB = connectDb;

// collection_connection = mongoose.model("covidtally", tallySchema);

// exports.connection = collection_connection;
