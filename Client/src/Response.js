import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetResponse, SubmitMarks } from "./apicalls/questions";

function Response() {
  const { username } = useParams();
  const [response, setResponse] = useState();
  const location = useLocation();

  const [selectedQuantities, setSelectedQuantities] = useState([]);

  const navigate = useNavigate(); //
  const usernameFromState = location.state?.username || username; //

  const QuantitySelect = () => {
    const options = Array.from({ length: 10 }).map((_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ));
    return options;
  };

  useEffect(() => {
    const FetchResponse = async () => {
      try {
        const response = await GetResponse(username);
        if (response.success) {
          setResponse(response.data);
          setSelectedQuantities(Array(response.data.length).fill(1)); // Initialize selectedQuantities array
        }
      } catch (error) {
        console.error(error);
      }
    };
    FetchResponse();
  }, [username]);

  const handleQuantityChange = (index, value) => {
    const newSelectedQuantities = [...selectedQuantities];
    newSelectedQuantities[index] = value;
    setSelectedQuantities(newSelectedQuantities);
  };

  const handleMarks = async (e) => {
    const marksResponse = {};
    marksResponse.username = username;
    marksResponse.marks = selectedQuantities;
    e.preventDefault();
    try {
      const response = await SubmitMarks(marksResponse);
      console.log("response +++++ ", response);
      if (response.success) {
        if (response.success) {
          navigate(`/${usernameFromState}/review`, {
            state: {
              aggregateMarks:
                response.data.updatedAggregateMarks.aggregateMarks,
              name: username,
            },
          });
        } else {
          console.log("Error ----- ", response.statusText);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!response) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className="mt-5">
      <h1>Question Paper</h1>

      <div className="row">
        <div className="col-md-10 d-flex justify-content-center align-items-center">
          <form onSubmit={handleMarks}>
            {response.map((item, index) => (
              <div className="mb-3" key={index}>
                <div className="d-flex  justify-content-between">
                  <label
                    className="form-label"
                    style={{ marginRight: "480px" }}
                  >
                    Q{index + 1}. {item.question} ({item.difficultyLevel})
                  </label>
                </div>
                <div className=" d-flex justify-content-between">
                  <div className="col-md-8">
                    <textarea
                      className="form-control"
                      id={`response{index + 1} -answer`}
                      name={`response {index + 1} -answer`}
                      rows="5"
                      value={item.answer}
                      style={{ width: "620px" }}
                    ></textarea>
                  </div>
                  <div className="col-md-2 " style={{ paddingLeft: "30px" }}>
                    <p className="mt-3 fw-bold">Ratings</p>
                    <select
                      className="form-select w-75 rounded-3"
                      value={selectedQuantities[index]}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    >
                      <QuantitySelect />
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button type="submit" className="btn btn-primary">
              Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Response;
