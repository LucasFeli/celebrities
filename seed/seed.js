const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity.model");
const { celebrities } = require("./data");
const connectDb = require("../config");

async function seedDb() {
  try {
    await connectDb();
    await Celebrity.create(celebrities);
    const closedDb = await mongoose.connection.close();
    console.log("close", closedDb);
  } catch (err) {
    console.error(err);
  }
}

seedDb();
