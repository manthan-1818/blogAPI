import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import axios from "axios";

const Preview = () => {
  const { _id } = useParams();
  console.log("blog id", _id);
  const [blogData, setBlogData] = useState({ title: "", description: "" });
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("inside the preview");
        const response = await axios.get(
          `http://localhost:5000/blog/preview/?_id=${_id}`
        );
        console.log("blog data", response.data);
        setBlogData(response.data);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    getData();
  }, [_id]);
  return (
    <>
      <div className="container-fluid">
        <div className="row m-2">
          <div className="col-sm-2 ">
            <button className="btn btn-dark ">
              <Link
                to="/Blog"
                id="lnk"
                style={{ color: "white", textDecoration: "none" }}
                className="pt-5"
              >
                <ChevronLeftIcon />
                Black
              </Link>
            </button>
          </div>
          <div className="col-sm-10">
            <h2>Title:</h2>
            <h3>{blogData.title}</h3>
          </div>
        </div>
        <hr></hr>

        <div className="row">
          <div className="col-sm-6">
            <img
              src={`data:${blogData.contentType};base64,${blogData.imageData}`}
              alt={blogData.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="col-sm-6">
            <h5>Description:</h5>
            <br />
            <p>{blogData.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
