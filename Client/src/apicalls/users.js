// import React from "react";
import axios from "axios";
// import { axiosInstance } from ".";
axios.defaults.baseURL = "http://localhost:5000";

export const LoginUser = async (user) => {
  try {
    const response = await axios.post("/api/users/login", user);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const RegisterUser = async (registerUser) => {
  try {
    const response = await axios.post("/api/users/register", registerUser);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetUsersWithAnswers = async () => {
  try {
    const response = await axios.get("/api/users/getUsersWithAnswers");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const GetStudentsAggregateMarks = async (username) => {
  console.log("GetStudentsAggregateMarks******");
  try {
    const response = await axios.get(
      `/api/users/getStudentsAggregateMarks/${username}`
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
