const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: SchemaTypes.String,
    maxlength: 64,
    required: true,
  },
  lastName: { type: SchemaTypes.String, maxlength: 64 },
  email: {
    type: SchemaTypes.String,
    required: true,
    lowercase: true,
    minlength: 8,
    maxlength: 128,
    index: { unique: true },
  },
  age: {
    type: SchemaTypes.Number,
    maxlength: 3,
  },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
