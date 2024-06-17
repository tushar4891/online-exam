const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    difficultyLevel: {
      type: String,
      required: true,
    },
    skillId: {
      type: Number,
      required: true,
    },
    marks: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("answers", answerSchema);
