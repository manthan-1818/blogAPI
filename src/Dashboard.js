import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import NavComponent from "./Navbar.js";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [id, setId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const editRow = async (id) => {
    const user = users.find((user) => user.id === id);
    setFormData(user);
    setId(id);
    setShow(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/users/${deleteId}`);
      console.log(`User deleted with ID ${deleteId}`);
      setUsers(users.filter((user) => user.id !== deleteId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const actionButtonRenderer = (params) => {
    return (
      <>
        <Button
          variant="primary"
          size="sm"
          onClick={() => editRow(params.data.id)}
          className="mx-2"
        >
          Edit
        </Button>{" "}
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            setShowDeleteModal(true);
            setDeleteId(params.data.id);
          }}
          className="mx-2"
        >
          Delete
        </Button>
      </>
    );
  };

  const columnDefs = [
    { headerName: "ID", field: "id", width: 50 },
    { headerName: "Name", field: "name", filter: true },
    { headerName: "Email", field: "email", filter: true },
    { headerName: "Role", field: "role", filter: true },
    { headerName: "Contact", field: "contact", filter: true },
    { headerName: "State", field: "state", filter: true },
    { headerName: "Actions", cellRenderer: actionButtonRenderer },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
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
    <NavComponent />
      <div className="container">
        <div className="row mt-3 mb-3">
          <div className="col">
            <h3>User Dashboard</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div
              className="ag-theme-alpine"
              style={{ height: "500px", width: "100%" }}
            >
              <AgGridReact columnDefs={columnDefs} rowData={users} />
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
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

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleCloseDeleteModal}>
Cancel
</Button>
<Button variant="danger" onClick={handleDelete}>
Delete
</Button>
</Modal.Footer>
</Modal>
</>
);
};

export default Dashboard;

