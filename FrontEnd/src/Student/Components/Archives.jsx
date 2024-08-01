import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Archives.css";
import Home from "../Assets/Home Icon.jpg";

function Archives() {
  const Navigate = useNavigate();
  const uploadForm = useRef(null);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/images`
      );
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Image uploaded successfully");
      fetchImages();
      setFile(null);
    } catch (error) {
      console.error("Error uploading image", error);
      alert("Failed to upload image");
    }
  };

  const handleHomeNavigation = () => {
    Navigate("/mainpage");
  };

  const handleOpenUploadForm = () => {
    uploadForm.current.classList.add("show");
  };

  const handleCloseUploadForm = () => {
    uploadForm.current.classList.remove("show");
  };

  const handleDownload = async (fileName) => {
    try {
      console.log("Downloading file:", fileName);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/download/${fileName}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file", error);
      alert("Failed to download file");
    }
  };

  return (
    <>
      <div className="archives-container">
        <div className="topBar">
          <button className="home-btn" onClick={handleHomeNavigation}>
            <img src={Home} alt="" />
            Home
          </button>
        </div>

        <div className="images-container">
          {images.map((image, index) => (
            <div key={index} className="card">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${image.path}`}
                alt={image.name}
              />
              <div className="card-content">
                <p>{image.name}</p>
                <button onClick={() => handleDownload(image.name)}>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="filtersandbuttons">
          <div className="leftside">
            <button className="upload-btn" onClick={handleOpenUploadForm}>
              Upload Image
            </button>
          </div>
          <div className="rightSide">
            <button className="previous-btn">&lt;</button>
            <button className="next-btn">&gt;</button>
          </div>
        </div>
      </div>

      <div className="upload-form" ref={uploadForm}>
        <form onSubmit={handleUpload}>
          <div className="input-container">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </div>
          <div className="bottom-buttons">
            <button
              className="cancel-btn"
              type="button"
              onClick={handleCloseUploadForm}
            >
              Cancel
            </button>
            <button className="upload-btn" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Archives;
