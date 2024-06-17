import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { GetStudentsMarks } from "./apicalls/questions";
import { GetStudentsAggregateMarks } from "./apicalls/users";
import toast from "react-hot-toast";

function Result() {
  const { username } = useAuth();
  const [result, setResult] = useState();

  useEffect(() => {
    const FetchStudentMarks = async () => {
      try {
        const response = await GetStudentsAggregateMarks(username);
        if (response.success) {
          setResult(response.data);
        } else {
          return toast.error(response.message);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
      }
    };
    FetchStudentMarks();
  }, [username]);

  return (
    <div>
      <div>
        {result ? (
          <div className="d-flex gap-3 flex-column justify-content-center align-items-center vh-100 text-center other-margin">
            <h3 className="fw-bold">Congratulation !</h3>
            <h5 className="">
              {result.username} you have got {result.aggregateMarks} marks
            </h5>
          </div>
        ) : (
          <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
