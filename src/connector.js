//const mongodb = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();
// const mongoURI = "mongodb://localhost:27017" + "/covidtally"

let mongoose = require("mongoose");
const { tallySchema } = require("./schema");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection established with mongodb server online");
  })
  .catch((err) => {
    console.log("error while connection", err);
  });
collection_connection = mongoose.model("covidtally", tallySchema);

exports.connection = collection_connection;
