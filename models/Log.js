const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const logSchema = new Schema({
  date: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Date.now(),
  },
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  newsletterName: { type: SchemaTypes.String, required: true },
});

module.exports = mongoose.model("Log", logSchema);
