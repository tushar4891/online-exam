import React, { useEffect, useState } from "react";
import { GetAllCandidates, GetStudentsMarks } from "./apicalls/questions";
import { Link, useLocation, useParams } from "react-router-dom";
import { GetUsersWithAnswers } from "./apicalls/users";
import toast from "react-hot-toast";

function Review() {
  const [candidate, setCandidate] = useState([]);
  const [marks, setMarks] = useState(0);
  const [aggregatesMarks, setAggregatesMarks] = useState([]);

  const location = useLocation();
  const { aggregateMarks, name } = location.state || {};
  const username = useParams(); //

  useEffect(() => {
    const FetchAllCandidates = async () => {
      try {
        const response = await GetAllCandidates();
        if (response.success) {
          setCandidate(response.data.allCandidates);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
      }
    };
    FetchAllCandidates();
  }, []);

  useEffect(() => {
    const FetchMarks = async () => {
      try {
        const response = await GetStudentsMarks();
        if (response.success) {
          setAggregatesMarks(response.data.allCandidates);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
      }
    };
    FetchMarks();
  }, []);

  // Helper function to get marks for a candidate
  const getMarksForCandidate = (username) => {
    const studentMarks = aggregatesMarks.find(
      (mark) => mark.username === username
    );
    return studentMarks ? studentMarks.aggregateMarks : 0;
  };

  return (
    <section>
      <div className="mt-5" style={{ marginLeft: "80px" }}>
        <h2 className="fw-bold" style={{ letterSpacing: "3px" }}>
          Candidates
        </h2>
        <hr
          class=" border-bottom mt-3"
          style={{ width: "93%", marginTop: "-15px" }}
        />
      </div>

      {candidate.length > 0 && (
        <div className="col-md-10 ms-5">
          <table className="table text-center table-borderless table-striped table-hover shadow-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Review</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {candidate.map((student, index) => (
                <tr key={index}>
                  <td>{student.username}</td>
                  <td className="mb-5">
                    <Link
                      to={`/response/${student.username}`}
                      state={{ username: username.name }}
                    >
                      <button className="btn btn-info btn-sm">Review</button>
                    </Link>
                  </td>
                  <td>{getMarksForCandidate(student.username)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Review;
