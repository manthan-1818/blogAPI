import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import axios from "axios";

const Preview = () => {
 
  const location = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(location.search);
 
  console.log("iiiiiiiiidddd", id);

  const [blogData, setBlogData] = useState({ title: "", description: "", imageUrl: "" });


  useEffect(() => {
    const getData = async () => {
      try {
        console.log("inside the preview", id);
        const response = await axios.get(`http://localhost:5000/blog/preview/${id}`);
        console.log("blog data", response.data);
       console.log("Image URL:", response.data.imageUrl);
        setBlogData(response.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    if (id) {
      getData();      
    }
  }, [id]);

  // Log the image URL
 

  return (
    <>
      <div className="container mt-5">
        
        <div className="row mb-4">
          <div className="col-12">
            <Link to="/Blog" className="btn btn-dark d-flex align-items-center">
              <ChevronLeftIcon /> Back to Blog
            </Link>
          </div>
        </div>

       
        <div className="row mb-4">
          <div className="col-12">
            <h2>Title:</h2>
            <h3>{blogData.title}</h3>
          </div>
        </div>

        <hr />

       
        <div className="row">
          

          <div className="col-md-6 mb-4" >
            <img
              src={blogData.imageUrl}
              alt={blogData.title}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h5>Description:</h5>
            <p>{blogData.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
