const { connection } = require("./connector");
const { data } = require("./data");

const refreshAll = async () => {
  await connection.deleteMany({});

  // const finalData = data.map((item) => ({
  //   ...item,
  //   mortality: item.death / item.infected,
  // }));

  const insertedData = await connection.insertMany(data);
};

refreshAll();
