import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import "../CSS/Mtech.css"; // Importing the CSS file for styling

import Home from "../Assets/Home Icon.jpg"; // Importing the Home icon image
import Search from "../Assets/Filter-SearchIcon.png"; // Importing the Search icon image

function Mtech() {
  const Navigate = useNavigate();
  const contributionFormContainer = useRef(null);

  // Function to handle navigation to the home page
  function handleHomeNavigation() {
    Navigate("/mainpage");
  }

  // Function to handle opening the new contribution form
  function handleOpenNewContribution() {
    contributionFormContainer.current.classList.add("show");
  }

  // Function to handle closing the new contribution form
  function handleCloseNewContribution() {
    contributionFormContainer.current.classList.remove("show");
  }

  return (
    <>
      {/* Main container for Mtech component */}
      <div className="mtech-container">
        {/* Top bar section */}
        <div className="topBar">
          {/* Home button */}
          <button className="home-btn" onClick={handleHomeNavigation}>
            <img src={Home} alt="" />
            Home
          </button>
          
          {/* Contribute button */}
          <button
            className="contribution-btn"
            onClick={handleOpenNewContribution}
          >
            Contribute
          </button>
        </div>

        {/* Filters section */}
        <div className="filters">
          {/* Left side of filters */}
          <div className="leftSide">
            {/* Search bar */}
            <div className="filters-searchBar">
              <img src={Search} alt="search-icon" />
              <input type="search" placeholder="Search..." />
            </div>
          </div>

          {/* Right side of filters */}
          <div className="rightSide">
            {/* Department filter */}
            <div className="department filter">
              <input type="text" list="department" placeholder="Department" />
              <datalist id="department">
                <select>
                  <option value="CSE-IOT">CSE-IOT</option>
                </select>
              </datalist>
            </div>
          </div>
        </div>

        {/* Materials table section */}
        <div className="materials-table">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subject Code</th>
                <th>subject Name</th>
                <th>Material Name</th>
                <th>Contributor</th>
                <th>Download</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>BCSE305P</td>
                <td>Database Systems</td>
                <td>Module 1</td>
                <td>Admin</td>
                <td>
                  <Icon
                    icon="streamline:download-circle-solid"
                    color="black"
                    width="24"
                    height="24"
                  />
                </td>
                <td>
                  <Icon
                    icon="icon-park-solid:preview-open"
                    color="black"
                    width="24"
                    height="24"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table filters section */}
        <div className="table-filters">
          {/* Left side of table filters */}
          <div className="leftSide">
            {/* Content filter */}
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
                of <span className="rowCount">100</span> Entries
              </p>
            </div>
          </div>

          {/* Right side of table filters */}
          <div className="rightSide">
            {/* Navigation buttons */}
            <button className="previous-btn">&lt;</button>
            <button className="next-btn">&gt;</button>
          </div>
        </div>
      </div>

      {/* Contribution form container */}
      <div
        className="contribution-form-container"
        ref={contributionFormContainer}
      >
        {/* Contribution form */}
        <div className="cf-form">
          {/* Contribution form header */}
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

          {/* Contribution form content */}
          <form>
            {/* First row of the contribution form */}
            <div className="cf-row1">
              <input
                type="text"
                list="subjectCode-list"
                placeholder="Subject Code"
              />
              <datalist id="subjectCode-list">
                <select>
                  <option value="BCSE305P">BCSE305P</option>
                </select>
              </datalist>
              <input
                type="text"
                list="subjectName-list"
                placeholder="Subject Name"
              />
              <datalist id="subjectName-list">
                <select>
                  <option value="DataBase Systems">DataBase Systems</option>
                </select>
              </datalist>
            </div>

            {/* Second row of the contribution form */}
            <div className="cf-row2">
              <input type="text" placeholder="Materials Name" />
            </div>

            {/* Third row of the contribution form */}
            <div className="cf-row3">
              <button className="confirm-btn">Contribute</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Mtech;