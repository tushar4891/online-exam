// import { PiExamLight } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Home.css";

function Home() {
  const { isLoggedIn, setIsLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); //

  const handleClick = () => {
    // setIsLoggedIn(false);
    logout();
    navigate("/");
  };

  return (
    <>
      <div>
        <div>
          <div
            className="row"
            style={{ background: "#eef4fe", height: "40px" }}
          ></div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="d-flex flex-column">
              <h3 className="display-4 fw-bold" style={{ marginTop: "70px" }}>
                We are changing the way student exam
              </h3>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                eligendi veritatis natus facere blanditiis doloremque obcaecati
                nostrum odio dignissimos provident?
              </p>
              <div className="d-flex gap-5 mt-5 m-lg-5">
                <Link to="/login">
                  <button
                    className="btn btn-md text-white me-5"
                    style={{ backgroundColor: "#0d6efd" }}
                  >
                    Login
                  </button>
                </Link>

                <Link
                  to={isLoggedIn ? `/${username}/result` : "/login"}
                  state={{ from: location.pathname }}
                >
                  <button
                    className="btn btn-md text-white"
                    style={{ backgroundColor: "#0d6efd" }}
                  >
                    Result
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <img
              src="i21.jpg"
              alt=""
              style={{ height: "70vh", width: "80%" }}
              className="mt-5  rounded-2"
            />
          </div>
        </div>
      </div>
    </>
  );

  /*
  return (
    <div>
      <div>
        <div
          className="row"
          style={{ background: "#eef4fe", height: "40px" }}
        ></div>
      </div>
      <div className="row">
        <div className="col-md-7">
          <div className="d-flex flex-column">
            <h3 className="display-4 fw-bold" style={{ marginTop: "70px" }}>
              We are changing the way student exam
            </h3>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              eligendi veritatis natus facere blanditiis doloremque obcaecati
              nostrum odio dignissimos provident?
            </p>
            <div className="d-flex gap-5 mt-5 m-lg-5">
              <Link to="/login">
                <button
                  className="btn btn-md text-white me-5"
                  style={{ backgroundColor: "#0d6efd" }}
                >
                  Students Login
                </button>
              </Link>
              <button
                className="btn btn-md text-white"
                style={{ backgroundColor: "#0d6efd" }}
              >
                Result
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <img
            src="i2.jpg"
            alt=""
            style={{ height: "70vh", width: "80%" }}
            className="mt-5"
          />
        </div>
      </div>
    </div>
  );

  */
}

export default Home;
