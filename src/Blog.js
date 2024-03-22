import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Col,
  Row,
  NavDropdown,
  Container,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import NavComponent from "./Navbar.js";

const Blog = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [blog, setBlog] = useState([]);
  const userRole = localStorage.getItem("role");
  const [role, setRole] = useState(userRole !== "user");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
    setFormData({
      title: "",
      description: "",
    });
  };

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/blog");
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/blog`, formData);
      setBlog([...blog, response.data]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleShowUpdateModal = (params) => {
    const id = params.data.id;
    const matchedBlog = blog.find((blog) => blog.id === id);
    setFormData({
      id: matchedBlog.id,
      title: matchedBlog.title,
      description: matchedBlog.description,
    });
    setShowUpdateModal(true);
  };

  const handleSubmitUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3001/blog/${formData.id}`);
      const updatedBlogs = blog.map((item) =>
        item.id === formData.id ? formData : item
      );
      setBlog(updatedBlogs);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/blog/${id}`);
        setBlog(blog.filter((blog) => blog.id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const editButtonRenderer = (params) => {
    return (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => handleShowUpdateModal(params)}
      >
        Edit
      </button>
    );
  };

  const deleteButtonRenderer = (params) => {
    return (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(params.data.id)}
      >
        Delete
      </button>
    );
  };

  const columnDefs = [
    { headerName: "ID", field: "id", width: 50 },
    { headerName: "Title", field: "title" },
    { headerName: "Description", field: "description" },
    { headerName: "Edit", cellRenderer: editButtonRenderer },
    { headerName: "Delete", cellRenderer: deleteButtonRenderer },
  ];

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <>
      <NavComponent />

      <>
        <header className="header text-center">
          <div className="container">
            {" "}
            <h3 className="headerText d-inline-block ">Blog app in React</h3>
            {role && (
              <Button
                className="rounded-2 float-end "
                variant="primary"
                onClick={handleShowAddModal}
                style={{ padding: '5px 10px', fontSize: '0.999rem' }}
              >
                Add Blog
              </Button>
            )}
          </div>
        </header>

        {/* Table section */}
        <Container fluid className="dashboardContainer">
          <Row>
            <Col>
              <section className="mt-3">
                <div className="container">
                  <div
                    className="ag-theme-alpine"
                    style={{ height: "500px", width: "100%" }}
                  >
                    <AgGridReact columnDefs={columnDefs} rowData={blog} />
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </>

      {/* Add Blog Modal */}
      <Modal
        show={showAddModal}
        onHide={handleCloseAddModal}
        style={{ border: "2px solid blue", borderRadius: "10px" }}
      >
        <Modal.Header
          closeButton
          className="modalTitle"
          style={{ backgroundColor: "lightblue", color: "black" }}
        >
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "lightblue" }}>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group className="mb-2" controlId="formGridTitle">
              <Form.Label className="modalLabel">Title</Form.Label>
              <Form.Control
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridDescription">
              <Form.Label className="modalLabel">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "lightblue" }}>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitAdd}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Blog Modal */}
      <Modal
        show={showUpdateModal}
        onHide={handleCloseUpdateModal}
        style={{ border: "2px solid green", borderRadius: "10px" }}
      >
        <Modal.Header
          closeButton
          className="modalTitle"
          style={{ backgroundColor: "lightgreen", color: "black" }}
        >
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "lightgreen" }}>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group className="mb-2" controlId="formGridTitle">
              <Form.Label className="modalLabel">Title</Form.Label>
              <Form.Control
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridDescription">
              <Form.Label className="modalLabel">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "lightgreen" }}>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitUpdate}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Update Blog Modal End */}
    </>
  );
};
export default Blog; // Don't forget to export the Blog component
