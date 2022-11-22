const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 1337;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require("./connector");
const { data } = require("./data");

app.get("/totalRecovered", async (req, res) => {
  try {
    const result = await connection.find();

    let totalRecovered = 0;

    result.forEach((element) => {
      totalRecovered += element.recovered;
    });

    res.status(200).json({
      data: {
        _id: "total",
        recovered: totalRecovered,
      },
    });
  } catch (error) {
    console.warn(error);
  }
});

app.get("/totalActive", async (req, res) => {
  try {
    const result = await connection.find();

    let totalRecovered = 0;
    let totalInfected = 0;

    result.forEach((record) => {
      totalRecovered += record.recovered;
    });

    result.forEach((record) => {
      totalInfected += record.infected;
    });

    res.status(200).json({
      data: {
        _id: "total",
        active: totalInfected - totalRecovered,
      },
    });
  } catch (error) {
    console.warn(error);
  }
});

app.get("/totalDeath", async (req, res) => {
  try {
    const result = await connection.find();

    let totalDeath = 0;

    result.forEach((record) => {
      totalDeath += record.death;
    });

    res.status(200).json({
      data: {
        _id: "total",
        death: totalDeath,
      },
    });
  } catch (error) {
    console.warn(error);
  }
});

app.get("/hotspotStates", async (req, res) => {
  try {
    const result = await connection.find();

    let hotspotStates = [];
    result.forEach((record) => {
      const rate = parseFloat(
        (record.infected - record.recovered) / record.infected
      ).toFixed(5);
      if (rate > 0.1) {
        hotspotStates.push({
          state: record.state,
          rate,
        });
      }
    });

    res.status(200).json({
      data: hotspotStates,
    });
  } catch (error) {
    console.warn(error);
  }
});

app.get("/healthyStates", async (req, res) => {
  try {
    const result = await connection.find();

    let mortalityRate = [];

    result.forEach((record) => {
      const rate = parseFloat(record.death / record.infected).toFixed(5);
      if (rate < 0.005) {
        mortalityRate.push({
          state: record.state,
          mortality: rate,
        });
      }
    });

    res.status(200).json({
      data: mortalityRate,
    });
  } catch (error) {
    console.warn(error);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
