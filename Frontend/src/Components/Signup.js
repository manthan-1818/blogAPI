import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Signup.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const roles = [
  { id: 1, name: "User" },
  { id: 2, name: "Admin" },
];

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    state: "",
    pswd: "",
    cpswd: "",
    role: "User",
  });

  const [availableStates, setAvailableStates] = useState([]);
  const [valid, setValid] = useState(false);
  const [pswd, setPswd] = useState("");
  const [cpswd, setCpswd] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleStateChange = (event) => {
    setData({
      ...data,
      state: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!data.pswd) {
        setPasswordError("");
        setSubmitted(true);
        return;
      }
      if (!passwordRegex.test(data.pswd)) {
        setPasswordError(
          "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number."
        );
        setSubmitted(true);
        return;
      }
      if (!data.name || !data.email || !data.pswd || !data.cpswd) {
        setSubmitted(true);
        console.error("Please fill in all required fields.");
        return;
      }

      const response = await axiosInstance.post("submit/register", data);
      setData({
        name: "",
        email: "",
        contact: "",
        state: "",
        pswd: "",
        cpswd: "",
        role: "User",
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSubmitted(false);
        setPasswordError("");
      }, 1000);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const regex = /^[a-zA-Z\s]*$/;
      if (regex.test(value) || value === "") {
        setData({ ...data, [name]: value });
      }
    } else if (name === "contact") {
      const regex = /^\d{0,10}$/;
      if (regex.test(value) || value === "") {
        setData({ ...data, [name]: value });
      }
    } else if (name === "pswd") {
      setPswd(value);
      setData({ ...data, pswd: value });
    } else if (name === "cpswd") {
      setCpswd(value);
      setData({ ...data, cpswd: value });
    } else {
      setData({ ...data, [name]: value });
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  useEffect(() => {
    if (pswd.length >= 8 && cpswd === pswd) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [pswd, cpswd]);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <h2 className="signup mt-3 mb-3">Signup</h2>
            <div className="card shadow p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      submitted && !data.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    name="name"
                    placeholder="Enter Full Name"
                    value={data.name}
                    onChange={handleChange}
                  />
                  {submitted && !data.name && (
                    <div className="invalid-feedback">
                      Please enter your full name.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" style={{ color: "black" }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      submitted && !data.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  {submitted && !data.email && (
                    <div className="invalid-feedback">
                      Please enter your email.
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" style={{ color: "black" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      submitted && (!data.pswd || passwordError) ? "is-invalid" : ""
                    }`}
                    id="password"
                    name="pswd"
                    placeholder="Password"
                    value={data.pswd}
                    onChange={handleChange}
                  />
                  {submitted && (!data.pswd || passwordError) && (
                    <div className="invalid-feedback">
                      {!data.pswd && "Please enter your password."}
                      {passwordError && passwordError}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="cpswd"
                    value={data.cpswd}
                    onChange={handleChange}
                  />
                  {submitted && !data.cpswd && (
                    <div className="invalid-feedback">
                      Please confirm your password.
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact">Contact Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contact"
                    placeholder="Enter Contact Number"
                    name="contact"
                    value={data.contact}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="Enter State"
                    onChange={handleStateChange}
                    value={data.state}
                  />
                </div>
                {success && (
                  <div className="alert alert-success" role="alert">
                    Registration successful!
                  </div>
                )}
                <button type="submit" className="btn btn-dark mt-3 mb-3">
                  Submit
                </button>
                <p>
                  <Link to="/" className="" id="register">
                    Already have an account?{" "}
                    <span className="text-dark">&nbsp;Login</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
