const router = require("express").Router();
const Answer = require("../models/answerModel");
const User = require("../models/userModel");
const AggregateMarks = require("../models/aggregateMarks");

router.post("/saveQuestion", async (req, res) => {
  try {
    // Extract user and responses from req.body
    const { user, response } = req.body;

    // Check if user has already submitted answers
    const existingAnswer = await Answer.findOne({ user });
    if (existingAnswer) {
      return res.send({
        success: false,
        message: "User has already submitted answers",
      });
    }

    // Transform the responses into an array of answer documents
    const answersArray = Object.keys(response).map((key) => ({
      user,
      question: response[key].question,
      answer: response[key].answer,
      difficultyLevel: response[key].difficultyLevel,
      skillId: response[key].skillId,
      marks: response[key].marks,
    }));

    // Save each answer document in the database
    await Answer.insertMany(answersArray);

    res.send({
      success: true,
      message: "Answers stored successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// get response
router.get("/getResponse/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const existingResponse = await Answer.find({ user: username });
    if (!existingResponse) {
      return res.send({
        success: false,
        message: "User has not submitted response",
      });
    } else {
      if (existingResponse) {
        return res.send({
          success: true,
          data: existingResponse,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// submit marks
router.post("/submitMarks", async (req, res) => {
  try {
    let easyQuestion = 0;
    let mediumQuestion = 0;
    let difficultQuestion = 0;
    let easyMarks = 0;
    let mediumMarks = 0;
    let difficultMarks = 0;
    let aggregateMarks = 0;

    const { username, marks } = req.body;
    const existingResponse = await Answer.find({ user: username });
    if (!existingResponse) {
      return res.send({
        success: false,
        message: "User has not submitted response",
      });
    }

    existingResponse.map((item, index) => {
      item.marks = marks[index];
      if (item.difficultyLevel === "Difficult") {
        difficultQuestion++;
        difficultMarks += marks[index];
      } else if (item.difficultyLevel === "Medium") {
        mediumQuestion++;
        mediumMarks += marks[index];
      } else {
        easyQuestion++;
        easyMarks += marks[index];
      }
    });

    aggregateMarks =
      (1 * easyQuestion * (easyMarks / easyQuestion) +
        (2 * mediumQuestion * (mediumMarks / mediumQuestion) +
          3 * difficultQuestion * (difficultMarks / difficultQuestion))) /
      (1 * easyQuestion + 2 * mediumQuestion + 3 * difficultQuestion);

    // Save the updated responses
    await Promise.all(existingResponse.map((item) => item.save()));

    //storing aggregate marks
    newFloatMarks = parseFloat(aggregateMarks.toFixed(2));

    // Update or create the aggregate marks entry
    const updatedAggregateMarks = await AggregateMarks.findOneAndUpdate(
      { username: username },
      { aggregateMarks: newFloatMarks },
      { new: true, upsert: true } // new: returns the updated document, upsert: creates if doesn't exist
    );

    return res.send({
      success: true,
      message: "Marks updated successfully",
      data: {
        updatedAggregateMarks,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
