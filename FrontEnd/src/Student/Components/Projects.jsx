// Importing necessary React and styling-related modules
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../CSS/Project.css";  // Importing project-specific CSS file

// Importing images for the Home and Search icons
import Home from "../Assets/Home Icon.jpg";
import Search from "../Assets/Filter-SearchIcon.png";

// Functional component for the Projects page
function Projects() {
  // Creating refs to manage contribution form and details container visibility
  const contributionFormContainer = useRef();
  const detailsContainer = useRef();

  // Using useNavigate hook to enable programmatic navigation
  const Navigate = useNavigate();

  // Navigation function to redirect to the main page
  function handleHomeNavigation() {
    Navigate("/mainpage");
  }

  
  function handleOpenNewSuggestion() {
    contributionFormContainer.current.classList.add("show");
  }

 
  function handleCloseNewContribution() {
    contributionFormContainer.current.classList.remove("show");
  }


  function handleOpenDetails() {
    detailsContainer.current.classList.add("show");
  }


  function handleCloseDetails() {
    detailsContainer.current.classList.remove("show");
  }

 
  return (
    <>
      
      <div className="projects-container">
       
        <div className="topBar">
          <button className="home-btn" onClick={handleHomeNavigation}>
            <img src={Home} alt="" />
            Home
          </button>
          <button className="contribution-btn" onClick={handleOpenNewSuggestion}>
            Contribute
          </button>
        </div>
        
      
        <div className="filters">
          <div className="leftSide">
            <div className="filters-searchBar">
              <img src={Search} alt="search-icon" />
              <input type="search" placeholder="Search..." />
            </div>
          </div>
          <div className="rightSide">
           
            <div className="subjectCode filter">
              <input type="text" list="subjectCode" placeholder="Subject Code" />
              <datalist id="subjectCode">
                <select>
                  <option value="BCSE305P">BCSE305P</option>
                </select>
              </datalist>
            </div>
            <div className="department filter">
              <input type="text" list="departmentName" placeholder="Department" />
              <datalist id="departmentName">
                <select>
                  <option value="CSE-IOT">CSE-IOT</option>
                </select>
              </datalist>
            </div>
            <div className="program filter">
              <input type="text" list="program" placeholder="Program" />
              <datalist id="program">
                <select>
                  <option value="B.Tech">B.Tech</option>
                </select>
              </datalist>
            </div>
          </div>
        </div>
        
        {/* Table displaying projects and their details */}
        <div className="projects-table">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Project Name</th>
                <th>Details</th>
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
                <td>PayRoll Management System</td>
                <td onClick={handleOpenDetails}>Details</td>
                <td>Admin</td>
                {/* Icons for download and preview actions */}
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
        
        {/* Table filters section for pagination and entry count */}
        <div className="table-filters">
          <div className="leftSide">
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
          <div className="rightSide">
            {/* Buttons for pagination */}
            <button className="previous-btn">&lt;</button>
            <button className="next-btn">&gt;</button>
          </div>
        </div>
      </div>

      {/* Contribution form container */}
      <div className="contribution-form-container" ref={contributionFormContainer}>
        <div className="pcf-form">
          {/* Header for the contribution form */}
          <div className="pcf-form-header">
            <p>Contribution Form</p>
            <Icon
              icon="ic:round-close"
              color="black"
              width="32"
              height="32"
              onClick={handleCloseNewContribution}
            />
          </div>
          {/* Form for contributing new projects */}
          <form>
            <div className="pcf-row1">
              {/* Input fields for subject code and subject name */}
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
            <div className="pcf-row2">
              {/* Input field for project name and textarea for project details */}
              <input type="text" placeholder="Project Name" />
              <textarea cols="30" rows="10" placeholder="Details..."></textarea>
            </div>
            <div className="pcf-row3">
              {/* Button to confirm contribution */}
              <button className="confirm-btn">Contribute</button>
            </div>
          </form>
        </div>
      </div>

      {/* Details container for displaying project details */}
      <div className="details-container" ref={detailsContainer}>
        <div className="details-box">
          <div className="top-contents">
            {/* Icon to close the details container */}
            <Icon
              icon="ic:round-close"
              color="black"
              width="32"
              height="32"
              onClick={handleCloseDetails}
            />
          </div>
          {/* Project details text */}
          <p>
            Our project is a comprehensive online platform for college
            students, offering features like faculty reviews, model
            timetables, faculty recommendations, study material sharing,
            coordinator communication, STARS DAY registration and archives,
            GPA/CGPA calculators, department and district connections, student
            chat, and access to college placement records. It aims to empower
            students by providing essential resources and fostering a sense of
            community, enhancing their college experience.
          </p>
        </div>
      </div>
    </>
  );
}

// Exporting the Projects component
export default Projects;
