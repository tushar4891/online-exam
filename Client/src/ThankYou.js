import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1> You have submitted response successfully !</h1>
      <Link to="/">
        <button className="btn btn-md btn-info mt-5">Home page</button>
      </Link>
    </div>
  );
}

export default ThankYou;
