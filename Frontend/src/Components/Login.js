import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setEmailError(e.target.value ? "" : "Email is required");
    } else if (e.target.name === "password") {
      setPasswordError(e.target.value ? "" : "Password is required");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email) {
      setEmailError("Email is required");
      return;
    }
    if (!credentials.password) {
      setPasswordError("Password is required");
      return;
    }
    try {
      const response = await axiosInstance.post("/submit/login", credentials);
      console.log("res", response.data);
      const { success, message, accessToken, refreshToken, user } =
        response.data;
      console.log("-----access---", accessToken);
      console.log("---refresh-----", refreshToken);
      if (success) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload(); 
        navigate("/dashboard");
        
      } else {
        setError("Login failed: " + message);
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="text-danger text-center mb-4">CRUD APP</h1>
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <h2 className="login mb-4">Login</h2>
          <div className="card shadow p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ color: "black" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={credentials.email}
                  onChange={handleChange}
                />
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ color: "black" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
              </div>
              {error && <div className="text-danger mb-3">{error}</div>}
              <button type="submit" className="btn btn-dark mt-3">
                Login
              </button>
              <p style={{ color: "black", marginTop: "1rem" }}>
                Don't have an account?
              </p>
              <Link to="/signup" className="text-dark text-sm">
                Sign up
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
