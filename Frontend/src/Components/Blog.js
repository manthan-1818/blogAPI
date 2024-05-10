import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import NavComponent from "./Navbar.js";

const Blog = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blog, setBlog] = useState([]);
  const [userRole, setUserRole] = useState({});

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    image: null,
  });
  const [deleteId, setDeleteId] = useState("");

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
    setFormData({
      title: "",
      description: "",
      image: null,
    });
  };

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blog/readblog");
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      return;
    }
    try {
      const formDataObject = new FormData();
      formDataObject.append("title", formData.title);
      formDataObject.append("description", formData.description);
      formDataObject.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:5000/submit/addblog",
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setBlog([...blog, response.data]);
      setShowAddModal(false);
      fetchBlogData(); // Fetch updated data after adding a blog post
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleShowUpdateModal = (id) => {
    const matchedBlog = blog.find((blog) => blog._id === id);
    // console.log("Matched Blog:", matchedBlog);
    setFormData({
      id: matchedBlog._id,
      title: matchedBlog.title,
      description: matchedBlog.description,
      image: null,
    });
    setShowUpdateModal(true);
  };

  const handleSubmitUpdate = async () => {
    try {
      console.log("Form Data:", formData);
      await axios.patch(
        `http://localhost:5000/blog/updateblog?id=${formData.id}`,
        formData
      );
      const updatedBlogs = blog.map((item) =>
        item._id === formData.id ? formData : item
      );
      setBlog(updatedBlogs);
      setShowUpdateModal(false);
      fetchBlogData();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/blog/deleteblog?id=${id}`);
      setBlog(blog.filter((blogItem) => blogItem.id !== id));
      setShowDeleteModal(false);
      fetchBlogData();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const editButtonRenderer = (params) => {
    if (userRole.role !== "User") {
      return (
        <>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleShowUpdateModal(params.data._id)}
          >
            Edit
          </Button>{" "}
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleShowDeleteModal(params.data._id)}
          >
            Delete
          </Button>
        </>
      );
    } else {
      return null;
    }
  };

  const columnDefs = [
    // { headerName: "ID", field: "_id", width: 100 },
    {
      headerName: "Title",
      field: "title",
      flex: 1,
      cellRenderer: (params) => {
        const { _id } = params.data;
        return <Link to={`/preview/${_id}`}>{params.value}</Link>;
      },
    },
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
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user);
  }, []);

  return (
    <>
      <NavComponent />
      <Row
        className="justify-content-center"
        style={{ overflow: "hidden", width: "100%" }}
      >
        <Col>
          <header className="text-center mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1 text-center mt-2">
                <h3>Blog App in React</h3>
              </div>
              {userRole.role !== "User" && (
                <Button
                  variant="primary"
                  onClick={handleShowAddModal}
                  style={{
                    marginRight: "2%",
                    marginTop: "1rem",
                    padding: "0.35rem 0.6rem",
                  }}
                >
                  Add Blog
                </Button>
              )}
            </div>
          </header>

          <div className="ag-theme-alpine" style={{ height: "31.25em" }}>
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

        <Modal.Header closeButton>
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group controlId="formGridTitle">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {!formData.title && (
                <Form.Text className="text-danger">Title is required</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formGridDescription">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {!formData.description && (
                <Form.Text className="text-danger">
                  Description is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formGridImage">
              <Form.Label className="modalLabel">Image</Form.Label>
              {formData.image && formData.image instanceof Blob && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Selected"
                  style={{ maxWidth: "100%", marginBottom: "10px" }}
                />
              )}
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitAdd}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showUpdateModal}
        onHide={handleCloseUpdateModal}
        centered
        className="blog-modal"
      >
        {/* Update Blog Modal Content */}

        <Modal.Header closeButton>
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUpdate}>
            <Form.Group controlId="formGridTitle">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {!formData.title && (
                <Form.Text className="text-danger">Title is required</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formGridDescription">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {!formData.description && (
                <Form.Text className="text-danger">
                  Description is required
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formGridImage">
              <Form.Label className="modalLabel">Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitUpdate}>
            Submit
          </Button>
        </Modal.Footer>
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
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
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
