import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import "../CSS/Btech.css";

import Home from "../Assets/Home Icon.jpg";
import Search from "../Assets/Filter-SearchIcon.png";

function Btech() {
  const Navigate = useNavigate();
  const contributionFormContainer = useRef(null);
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [contributor, setContributor] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    filterFiles();
  }, [searchQuery, files]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/files`
      );
      setFiles(response.data);
      setFilteredFiles(response.data);
    } catch (error) {
      console.error("Error fetching files", error);
    }
  };

  const filterFiles = () => {
    if (searchQuery.trim() === "") {
      setFilteredFiles(files);
    } else {
      const filtered = files.filter(
        (file) =>
          file.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          file.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFiles(filtered);
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("subjectCode", subjectCode);
    formData.append("subjectName", subjectName);
    formData.append("materialName", materialName);
    formData.append("contributor", contributor);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully");
      contributionFormContainer.current.classList.remove("show");
      fetchFiles();
      setSubjectCode("");
      setSubjectName("");
      setMaterialName("");
      setContributor("");
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Failed to upload file");
    }
  };

  const handleOpenNewContribution = () => {
    contributionFormContainer.current.classList.add("show");
  };

  const handleCloseNewContribution = () => {
    contributionFormContainer.current.classList.remove("show");
  };

  const handleDownload = async (fileName) => {
    try {
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
    } catch (error) {
      console.error("Error downloading file", error);
      alert("Failed to download file");
    }
  };

  function handleNavigate() {
    Navigate("/mainpage");
  }

  return (
    <>
      <div className="btech-container">
        <div className="topBar">
          <button className="home-btn" onClick={() => handleNavigate()}>
            <img src={Home} alt="Home" />
            Home
          </button>
          <button
            className="contribution-btn"
            onClick={handleOpenNewContribution}
          >
            Contribute
          </button>
        </div>
        <div className="filters">
          <div className="leftSide">
            <div className="filters-searchBar">
              <img src={Search} alt="search-icon" />
              <input
                type="search"
                placeholder="Search by Subject Code or Subject Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="materials-table">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>CAT1/CAT2/FAT</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredFiles) && filteredFiles.length > 0 ? (
                filteredFiles.map((file, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{file.subjectCode}</td>
                    <td>{file.subjectName}</td>
                    <td>{file.materialName}</td>
                    <td>
                      <button
                        className="download-btn"
                        onClick={() => handleDownload(file.name)}
                      >
                        <Icon
                          icon="streamline:download-circle-solid"
                          color="black"
                          width="24"
                          height="24"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No files found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-filters">
          {/* <div className="leftSide">
            <div className="content-filter">
              <p>Showing</p>
              <input type="text" defaultValue={10} list="range-list" />
              <datalist id="range-list">
                <select>
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </datalist>
              <p>
                of <span className="rowCount">{filteredFiles.length}</span> Entries
              </p>
            </div>
          </div>
          <div className="rightSide">
            <button className="previous-btn">&lt;</button>
            <button className="next-btn">&gt;</button>
          </div> */}
          <button className="top-btn">
            <a href="#top">Go to Top</a>
          </button>
        </div>
      </div>
      <div
        className="contribution-form-container"
        ref={contributionFormContainer}
      >
        <div className="cf-form">
          <div className="cf-form-header">
            <p>Contribution Form</p>
            <Icon
              icon="ic:round-close"
              color="black"
              width="32"
              height="32"
              onClick={handleCloseNewContribution}
            />
          </div>
          <form onSubmit={handleUpload}>
            <div className="cf-row1">
              <input
                type="text"
                placeholder="Subject Code"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
              />
              <input
                type="text"
                placeholder="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </div>
            <div className="cf-row2">
              <input
                type="text"
                placeholder="CAT1/CAT2/FAT"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
              />
            </div>
            <div className="cf-row3">
              <input
                type="text"
                placeholder="Contributor"
                value={contributor}
                onChange={(e) => setContributor(e.target.value)}
              />
            </div>
            <div className="cf-row4">
              <input type="file" id="fileInput" onChange={handleFileChange} />
            </div>
            <div className="cf-row5">
              <button className="confirm-btn" type="submit">
                Upload File
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Btech;
