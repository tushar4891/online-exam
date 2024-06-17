const router = require("express").Router();
const User = require("../models/userModel");
const Answer = require("../models/answerModel");
const AggregateMarks = require("../models/aggregateMarks");

// user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.send({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }
    // checking if password is correct
    const validPassword = req.body.password.localeCompare(user.password);
    if (validPassword !== 0) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }
    // If both checks pass, return success response
    res.send({
      success: true,
      message: "User logged in successfully",
      name: user.username,
      role: user.role,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

// User Registration
router.post("/register", async (req, res) => {
  try {
    // Validate input fields
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.send({
        success: false,
        message:
          "Please provide all required fields: username, email, password",
      });
    }

    // Check if user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.send({
        success: false,
        message:
          existingUser.email === email
            ? "Email already registered"
            : "Username already taken",
      });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

// Get aggregate marks
router.get("/getAggregateMarks", async (req, res) => {
  try {
    const allCandidates = await AggregateMarks.find();
    if (!allCandidates) {
      return res.send({
        success: false,
        message: "No Candidate found ",
      });
    } else {
      res.send({
        success: true,
        data: {
          allCandidates,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// Get all candidates
router.get("/getAllCandidates", async (req, res) => {
  try {
    const allCandidates = await User.find({ role: "candidate" });
    if (!allCandidates) {
      return res.send({
        success: false,
        message: "No Candidate found ",
      });
    } else {
      res.send({
        success: true,
        data: {
          allCandidates,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// Get all Reviewers
router.get("/getAllReviewers", async (req, res) => {
  try {
    const allReviewers = await User.find({ role: "reviewer" });
    if (!allReviewers) {
      return res.send({
        success: false,
        message: "No Reviewers found ",
      });
    } else {
      res.send({
        success: true,
        data: {
          allReviewers,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

//getUsersWithAnswers
router.get("/getUsersWithAnswers", async (req, res) => {
  try {
    const allCandidates = await User.find({ role: "candidate" });
    const answeredUser = await Answer.distinct("user");

    const userWithStatus = allCandidates.map((user) => ({
      username: user.username,
      hasSubmittedAnswer: answeredUser.includes(user.username),
    }));

    res.send({
      success: true,
      data: userWithStatus,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

// Get particular students aggregate marks
router.get("/getStudentsAggregateMarks/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const existingResponse = await AggregateMarks.find({ username: username });
    if (existingResponse.length === 0) {
      return res.send({
        success: false,
        message: "User has not submitted response",
      });
    } else {
      if (existingResponse) {
        return res.send({
          success: true,
          data: existingResponse[0],
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
module.exports = router;
