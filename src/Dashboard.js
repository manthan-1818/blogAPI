import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Modal, Button, Form, Col } from "react-bootstrap";
import NavComponent from "./Navbar.js";

const Dashboard = () => {
  const [confirmedLogout, setConfirmedLogout] = useState(false);
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [id, setId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [userToDelete, setUserToDelete] = useState(null); 

  const userRole = localStorage.getItem("userRole");


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
    
    if (userRole === "Admin") {
      return (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => editRow(params.data.id)}
        >
          Edit
        </button>
      );
    } else {
      return null; 
    }
  };
  
  const editRow = async (id) => {
    const user = users.find((user) => user.id === id);
    setFormData(user);
    setId(id);
    setShow(true);
  };

  const deleteRow = async (userId) => {
    setUserToDelete(userId); 
    setShowDeleteModal(true); 
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/users/${userToDelete}`);
      setUsers(users.filter((user) => user.id !== userToDelete));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); 
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

  const actionsCellRenderer = (params) => {
    return (
      <div>
        <button className="btn btn-primary btn-sm" onClick={() => editRow(params.data.id)}>Edit</button>{' '}
        <button className="btn btn-danger btn-sm" onClick={() => deleteRow(params.data.id)}>Delete</button>
      </div>
    );
  };
  

  const columnDefs = [
    { headerName: "ID", field: "id", width: 100 },
    { headerName: "Name", field: "name", filter: true },
    { headerName: "Email", field: "email", filter: true },
    { headerName: "Role", field: "role", filter: true },
    { headerName: "Contact", field: "contact", filter: true },
    { headerName: "State", field: "state", filter: true },
    { headerName: "Actions", cellRenderer: actionsCellRenderer },
  ];
  

  const columnUser = [
    { headerName: "ID", field: "id", width: 50 },
    { headerName: "Name", field: "name", filter: true },
    { headerName: "Email", field: "email", filter: true },
    { headerName: "Role", field: "role", filter: true },
    { headerName: "Contact", field: "contact", filter: true },
    { headerName: "State", field: "state", filter: true },
    {
      headerName: "Actions",
      cellRenderer: editButtonRenderer,
      width: 150,
      minWidth: 150,
      resizable: false,
    },
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
      if (name === "contact") {
        const regex = /^[0-9]*$/;
        if (regex.test(value) || value === "") {
          setFormData({ ...formData, [name]: value });
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/users/${id}`, formData);
      setUsers(users.map((user) => (user.id === id ? formData : user)));
      setShow(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

 
  return (
    <>
    <NavComponent />
    <div className="container">
  <div className="row mt-3 mb-3">
    <div className="col">
      <h3>User Dashboard</h3>
    </div>
  </div>
  <div className="row">
    <div className="col">
      {userRole === "Admin" ?  (
        <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
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
        <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
          <AgGridReact
            gridOptions={gridOptions}
            columnDefs={columnUser}
            rowData={users}
          />
        </div>
      )}
    </div>
  </div>
</div>


      <Modal
        show={showDeleteModal}
        onHide={handleCancelDelete}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        style ={{ border: "2px solid blue", borderRadius: "10px" }}
        >
          <Modal.Header
            closeButton
            className="modalTitle"
            style={{ backgroundColor: "lightblue", color: "black" }}
          >
            <Modal.Title>Update Form</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "lightblue" }}>
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
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "lightblue" }}>
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


