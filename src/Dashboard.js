import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Modal, Button, Form, Col } from "react-bootstrap";

const Dashboard = () => {
  const [confirmedLogout, setConfirmedLogout] = useState(false);
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [id, setId] = useState(null);
  

  const storedData = localStorage.getItem("data");
  const data = JSON.parse(storedData);
  const [role, setRole] = useState(data.role !== "User"); 
  console.log("...........", data.role);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("users"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    const result = window.confirm("Are you sure you want to log out?");
    if (result) {
      setConfirmedLogout(true);
      window.location.href = "/";
    } else {
      console.log("User clicked cancel");
    }
  };

  const editButtonRenderer = (params) => {
    return (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => editRow(params.data.id)}
      >
        Edit
      </button>
    );
  };

  const editRow = async (id) => {
    const user = users.find((user) => user.id === id);
    setFormData(user);
    setId(id);
    setShow(true);
  };

  const deleteRow = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/users/${userId}`);
        console.log(`User deleted with ID ${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      return;
    }
  };
  



  const deleteButtonRenderer = (params) => {
    return (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => deleteRow(params.data.id)}
      >
        Delete
      </button>
    );
  };

  const columnDefs = [
    { headerName: "ID", field: "id", width: 50 },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Role", field: "role" },
    { headerName: "Contact", field: "contact" },
    { headerName: "State", field: "state" },
    { headerName: "Edit", cellRenderer: editButtonRenderer },
    { headerName: "Delete", cellRenderer: deleteButtonRenderer },
  ];

  const columnUser = [
    { headerName: "ID", field: "id", width: 50 },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Role", field: "role" },
    { headerName: "Contact", field: "contact" },
    { headerName: "State", field: "state" },
  
  ];

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      flex: 1,
    },
    suppressCellSelection: true,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/users/${id}`, formData);
      console.log(`User updated with ID ${id}`);

      setUsers(users.map((user) => (user.id === id ? formData : user)));
      setShow(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      {confirmedLogout ? (
        <p>Logging out...</p>
      ) : (
        <>
          <div className="container-fluid text-center pt-2">
            <div className="d-flex justify-content-between align-items-center">
              <p className="d-inline-block bg-white text-black mx-auto px-4 py-2 rounded-pill shadow">
                Admin dashboard
              </p>
              <button
                className="btn btn-secondary logout"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
            className="btn btn-primary"
            onClick={() => setShow(true)}
          >
            Add User
          </button>
          
            </div>
          </div>
          <div className="container-flex header text-light text-center fs-3 bg-danger">
            CRUD APP
          </div>

          {role ? (
            <div
              className="ag-theme-alpine"
              style={{ height: "1200px", width: "100%" }}
            >
              <AgGridReact
                gridOptions={gridOptions}
                columnDefs={columnDefs}
                rowData={users}
                frameworkComponents={{
                  editButtonRenderer: editButtonRenderer,
                  deleteButtonRenderer: deleteButtonRenderer,
                }}
              />
            </div>
          ) : (
            <div
              className="ag-theme-alpine"
              style={{ height: "1200px", width: "100%" }}
            >
              <AgGridReact
                gridOptions={gridOptions}
                columnDefs={columnUser}
                rowData={users}
              />
            </div>
          )}
        </>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalTitle">
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label className="modalLabel">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label className="modalLabel">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridContact">
              <Form.Label className="modalLabel">Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridState">
              <Form.Label className="modalLabel">State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridRole">
              <Form.Label className="modalLabel">Role</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;
