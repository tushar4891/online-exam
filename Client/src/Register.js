import React, { useState } from "react";
import toast from "react-hot-toast";
import { Form, Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { RegisterUser } from "./apicalls/users";

function Register() {
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setRegisterUser((prevUser) => ({
      ...prevUser,
      role: e.target.value, // Update the role field in the state
    }));
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const response = await RegisterUser(registerUser);
      if (response.success) {
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <section className="w-25 mx-auto d-flex justify-content-center align-items-center  vh-100">
        <form className="shadow-lg p-4 mb-5 bg-body rounded" method="POST">
          <h1 className="text-center fs-4"> Register</h1>
          <FormInput
            type="text"
            label="Username"
            name="username"
            placeholder="Enter user name"
            onChange={handleChange}
          />
          <FormInput
            type="email"
            label="email"
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

          <div className="d-flex mt-3 me-4">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="candidate"
                checked
                onChange={handleRoleChange}
              />
              <label class="form-check-label" for="exampleRadios1">
                Candidate
              </label>
            </div>
            <div class="form-check ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="reviewer"
                onChange={handleRoleChange}
              />
              <label class="form-check-label" for="exampleRadios2">
                Reviewer
              </label>
            </div>
          </div>

          <div className="mt-3 d-grid">
            <button
              className="btn"
              style={{ background: "#0d6efd" }}
              onClick={handleClick}
            >
              Register
            </button>
          </div>
          <p className="text-center mt-3">
            Already a member? <Link to="/login"> Login</Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Register;
