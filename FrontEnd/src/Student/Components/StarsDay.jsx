import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../CSS/Starsday.css";

import Home from "../Assets/Home Icon.jpg";

function StarsDay() {
  // Initialize the navigate function from react-router-dom
  const Navigate = useNavigate();

  // Refs for DOM elements
  const participationFormContainer = useRef(null);
  const registeredPopup = useRef(null);

  // Function to navigate to the main page
  function handleHomeNavigation() {
    Navigate("/mainpage");
  }

  // Functions to handle opening and closing new participation form
  function handleOpenNewparticipation() {
    participationFormContainer.current.classList.add("show");
  }

  function handleCloseNewparticipation() {
    participationFormContainer.current.classList.remove("show");
  }

  // Functions to handle opening and closing the registered popup
  function handleOpenPopup() {
    registeredPopup.current.classList.add("show");
  }

  function handleClosePopup() {
    registeredPopup.current.classList.remove("show");
  }

  // JSX structure for the StarsDay component
  return (
    <>
      {/* Main container for the StarsDay component */}
      <div className="starsday-container">
        {/* Top bar with a home button */}
        <div className="topBar">
          <button className="home-btn" onClick={handleHomeNavigation}>
            <img src={Home} alt="" />
            Home
          </button>
        </div>

        {/* Agenda container with register and participate buttons */}
        <div className="agenda-container">
          <div className="bottom-items">
            <button className="register-btn" onClick={handleOpenPopup}>
              Register
            </button>
            <button
              className="participate-btn"
              onClick={handleOpenNewparticipation}
            >
              Participate
            </button>
          </div>
        </div>

        {/* Participation details heading */}
        <h2 className="participation-details">Participation Details</h2>

        {/* Table displaying participation details */}
        <div className="participation-details-table">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Event Name</th>
                <th>By</th>
                <th>Team Leader</th>
                <th>Team Members</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Dance</td>
                <td>2021</td>
                <td>Username</td>
                <td>List of the Team Members</td>
                <td>Event Description</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table filters for entries */}
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
            <button className="previous-btn">&lt;</button>
            <button className="next-btn">&gt;</button>
          </div>
        </div>
      </div>

      {/* Participation form container */}
      <div
        className="participation-form-container"
        ref={participationFormContainer}
      >
        <div className="pf-form">
          {/* Header for the participation form */}
          <div className="pf-form-header">
            <p>Life is for Participating not for spectating</p>
            <Icon
              icon="ic:round-close"
              color="black"
              width="32"
              height="32"
              onClick={handleCloseNewparticipation}
            />
          </div>

          {/* Form for participation details */}
          <form>
            <div className="pf-row1">
              <input type="text" placeholder="Event Name" />
              <input type="text" list="by" placeholder="By" />
              <datalist id="by">
                <select>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </datalist>
            </div>
            <div className="pf-row2">
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="pf-row3">
              <input type="text" list="type" placeholder="Team Members" />
              <datalist id="type">
                <select>
                  <option value="Team Members">Team Members</option>
                  <option value="Solo">Solo</option>
                </select>
              </datalist>
              <button className="add-member-btn">Add Member</button>
            </div>
            <div className="pf-row4">
              <textarea
                cols="30"
                rows="10"
                placeholder="Event Description"
              ></textarea>
            </div>
            <button className="participate-btn">Participate</button>
          </form>
        </div>
      </div>

      {/* Registered popup */}
      <div className="registeredPopup" ref={registeredPopup}>
        <div className="popup">
          <p>Registered Successfully</p>
          <button className="done-btn" onClick={handleClosePopup}>
            Done
          </button>
        </div>
      </div>
    </>
  );
}

export default StarsDay;
