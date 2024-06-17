import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Header.css";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isLoggedIn, setIsLoggedIn, username } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <header>
      <div className="d-flex justify-content-end  gap-4 header-item text-white align-items-center">
        {isLoggedIn ? (
          `Hello ${username} !`
        ) : (
          <Link
            to="/login"
            className="text-white "
            style={{ color: "#777e89" }}
          >
            Sign In / Guest
          </Link>
        )}
        {isLoggedIn && (
          <div
            className="btn btn-sm btn-outline-info rounded-3"
            onClick={handleClick}
          >
            Logout
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
