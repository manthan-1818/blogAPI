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
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete modal
  const [blog, setBlog] = useState([]);
  const userRole = localStorage.getItem("role");
  const [role, setRole] = useState(userRole !== "user");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [deleteId, setDeleteId] = useState(""); // State to store the ID of the blog to be deleted

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false); // Function to close delete modal
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
    if (!formData.title || !formData.description) {
      return;
    }
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
    try {
      await axios.delete(`http://localhost:3001/blog/${id}`);
      setBlog(blog.filter((blog) => blog.id !== id));
      setShowDeleteModal(false); // Close the Bootstrap modal after successful deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  

  const handleShowDeleteModal = (id) => {
    setDeleteId(id); // Set the ID of the blog to be deleted
    setShowDeleteModal(true); // Show the delete modal
  };

  const editButtonRenderer = (params) => {
    return (
      <>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleShowUpdateModal(params)}
        >
          Edit
        </Button>{" "}
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleShowDeleteModal(params.data.id)}
        >
          Delete
        </Button>
      </>
    );
  };

  const columnDefs = [
    { headerName: "ID", field: "id", width: 100 }, // Adjusted width to accommodate the ID numbers
    { headerName: "Title", field: "title", flex: 1 },
    { headerName: "Description", field: "description", flex: 1 },
    { 
      headerName: "Actions",
      cellRenderer: editButtonRenderer,
      width: 150,
      minWidth: 150,
      resizable: false,
    },
  ];
  
  
  
  

  useEffect(() => {
    fetchBlogData();
  }, []);

  return ( 
  
    <>
    <NavComponent />
    <Row className="justify-content-center">
      <Col>
        <header className="text-center mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="flex-grow-1 text-center mt-2">
              <h3>Blog App in React</h3>
            </div>
            {role && (
              <Button
                variant="primary"
                onClick={handleShowAddModal}
                style={{ marginRight: "18px" ,padding: "5px 8px",}} 
              >
                Add Blog
              </Button>
            )}
          </div>
        </header>
        <div className="ag-theme-alpine" style={{ height: "500px" }}>
          <AgGridReact columnDefs={columnDefs} rowData={blog} />
        </div>
      </Col>
    </Row>

      <Modal
        show={showAddModal}
        onHide={handleCloseAddModal}
        centered
        className="blog-modal"
      >
        {/* Add Blog Modal Content */}
      </Modal>

      <Modal
        show={showUpdateModal}
        onHide={handleCloseUpdateModal}
        centered
        className="blog-modal"
      >
        {/* Update Blog Modal Content */}
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        centered
        className="blog-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this blog?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Blog;
