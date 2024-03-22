import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
    role: "",
  });

  const [availableStates, setAvailableStates] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [valid, setValid] = useState(false);
  const [pswd, setPswd] = useState("");
  const [cpswd, setCpswd] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setData({ ...data, role: event.target.value });
  };

  const handleStateChange = (event) => {
    setData({
      // Update data state with new state
      ...data,
      state: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Set the form submitted flag to true
    setSubmitted(true);

    try {
      // Check if any required field is empty
      if (
        !data.name ||
        !data.email ||
        !data.pswd ||
        !data.cpswd ||
        !data.role
      ) {
        console.error("Please fill in all required fields.");
        return; // Exit the function early if any required field is empty
      }

      const response = await axios.post("http://localhost:3001/users", data);
      console.log(response.data);
      setData({
        name: "",
        email: "",
        contact: "",
        state: "",
        pswd: "",
        cpswd: "",
        role: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pswd") {
      setPswd(value);
    } else if (name === "cpswd") {
      setCpswd(value);
    }

    setData({ ...data, [name]: value });
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
        {/* <h1 className="text-danger text-center mb-1">CRUD APP</h1> */}
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
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Full Name"
                    value={data.name}
                    onChange={handleChange}
                  />
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
                      submitted && !data.pswd ? "is-invalid" : ""
                    }`}
                    id="password"
                    name="pswd"
                    placeholder="Password"
                    value={data.pswd}
                    onChange={handleChange}
                  />
                  {submitted && !data.pswd && (
                    <div className="invalid-feedback">
                      Please enter your password.
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

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-control"
                    id="role"
                    value={selectedRole}
                    onChange={handleRoleChange}
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
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
