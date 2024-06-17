import React, { useState } from "react";
import FormInput from "./FormInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginUser } from "./apicalls/users";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

function Login() {
  const { setIsLoggedIn, login } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const location = useLocation(); //
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    try {
      const response = await LoginUser(user);
      if (response.success) {
        toast.success(response.message);
        login(response.name); // Store username in AuthContext
        setIsLoggedIn(true);

        const from = location.state?.from || `/${response.name}/questions`; //

        if (response.role === "candidate") {
          navigate(from);
        } else {
          navigate(`/${response.name}/review`);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      // Handle network errors or unexpected exceptions
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <section className="w-75 mx-auto  d-flex justify-content-center align-items-center vh-100">
        <form className="shadow-lg p-4 mb-5 bg-light rounded" method="POST">
          <h1 className="text-center fs-4"> Login</h1>
          <FormInput
            type="email"
            label="Email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <FormInput
            type="password"
            label="Password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
          <button
            type="button"
            className="btn btn-info btn-block mt-3"
            onClick={handleClick}
            style={{ width: "250px" }}
          >
            LOGIN
          </button>

          <p className="text-center mt-3">
            Not a member yet? <Link to="/register"> Register</Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Login;
