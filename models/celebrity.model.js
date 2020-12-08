const { Schema, model } = require("mongoose");

const CelebritySchema = new Schema({
  name: String,
  catchPhrase: String,
  ocupation: String,
});

module.exports = model("Celebrity", CelebritySchema);
