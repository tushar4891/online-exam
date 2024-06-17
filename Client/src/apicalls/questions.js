// import React from "react";
import axios from "axios";
// import { axiosInstance } from ".";
axios.defaults.baseURL = "http://localhost:5000";

// SaveQuestions
export const SaveQuestions = async (userQuestion) => {
  try {
    const response = await axios.post(
      "/api/questions/saveQuestion",
      userQuestion
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// GetAllCandidates
export const GetAllCandidates = async () => {
  try {
    const response = await axios.get("/api/users/getAllCandidates");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Get aggregate marks
export const GetStudentsMarks = async () => {
  try {
    const response = await axios.get("/api/users/getAggregateMarks");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// GetResponse
export const GetResponse = async (username) => {
  try {
    const response = await axios.get(`/api/questions/getResponse/${username}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const SubmitMarks = async (marksResponse) => {
  console.log("/api/questions/submitMarks");
  try {
    const response = await axios.post(
      `/api/questions/submitMarks`,
      marksResponse
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
