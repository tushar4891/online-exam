import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SaveQuestions } from "./apicalls/questions";
import toast from "react-hot-toast";

function Questions() {
  const { name } = useParams(); // Retrieve the username from the URL
  const navigate = useNavigate();
  const [responses, setResponses] = useState({
    response1: {
      question: "What is Node.js?",
      answer: "",
      difficultyLevel: "Easy",
      skillId: 1,
      marks: "",
    },
    response2: {
      question: "What is Express.js?",
      answer: "",
      difficultyLevel: "Medium",
      skillId: 2,
      marks: "",
    },
    response3: {
      question: "What are Streams in Node.js?",
      answer: "",
      difficultyLevel: "Difficult",
      skillId: 3,
      marks: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [responseKey, field] = name.split("-");

    setResponses((prevResponses) => ({
      ...prevResponses,
      [responseKey]: {
        ...prevResponses[responseKey],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userQuestion = {};
    userQuestion.response = responses;
    userQuestion.user = name;

    const response = await SaveQuestions(userQuestion);
    if (response.success) {
      toast.success(response.message);
      navigate("/thankYou");
    } else {
      toast.error("Response not submitted");
    }
    // You can add the API call to submit responses here
  };

  return (
    <div className="mt-5">
      <h1>Question Paper</h1>

      <div className="row">
        <div className="col-md-10 d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="d-flex  justify-content-between">
                <label className="form-label" style={{ marginRight: "480px" }}>
                  Q1. {responses.response1.question} (
                  {responses.response1.difficultyLevel})
                </label>
              </div>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  id="response1-answer"
                  name="response1-answer"
                  rows="5"
                  value={responses.response1.answer}
                  onChange={handleChange}
                  style={{ width: "620px" }}
                ></textarea>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label" style={{ marginRight: "500px" }}>
                  Q2. {responses.response2.question} (
                  {responses.response2.difficultyLevel})
                </label>
              </div>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  id="response2-answer"
                  name="response2-answer"
                  rows="5"
                  value={responses.response2.answer}
                  onChange={handleChange}
                  style={{ width: "620px" }}
                ></textarea>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex  justify-content-between align-items-center">
                <label className="form-label" style={{ marginRight: "420px" }}>
                  Q3. {responses.response3.question} (
                  {responses.response3.difficultyLevel})
                </label>
              </div>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  id="response3-answer"
                  name="response3-answer"
                  rows="5"
                  value={responses.response3.answer}
                  onChange={handleChange}
                  style={{ width: "620px" }}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Questions;
