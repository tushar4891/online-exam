const mongoose = require("mongoose");

const aggregateMarksSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensures that the username is unique
    },
    aggregateMarks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("aggregateMarks", aggregateMarksSchema);
