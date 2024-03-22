import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch user data from the API
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;
      // Log the entire response and users array to inspect their structure
      console.log("Response:", response);
      console.log("Users:", users);
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].email === credentials.email &&
          credentials.email !== "" &&
          users[i].pswd === credentials.password &&
          credentials.password !== ""
        ) {
          // console.log("sucess");
          const data = {
            name: users[i].name,
            email: users[i].email,
            contact: users[i].contact,
            state: users[i].state,
            role: users[i].role
          };
          
          localStorage.setItem("data", JSON.stringify(data));
          // locatStorage.seItem('')
          navigate("/dashboard");

          return;
        } else {
          setError("Invalid email or password");
          // console.log("unsucess");
        }
      }
      // Rest of your code...
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
              </div>
              {error && <div className="text-danger mb-3">{error}</div>}
              <button type="submit" className="btn btn-dark mt-3">
                Submit
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
