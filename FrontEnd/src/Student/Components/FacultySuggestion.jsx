import { useRef, useState, useEffect } from "react";
import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import axios from "axios";
import "../CSS/FacultySuggestion.css";
import Home from "../Assets/Home Icon.jpg";
import Search from "../Assets/Filter-SearchIcon.png";
import FilledStar from "../Assets/FilledStar.png";
import EmptyStar from "../Assets/EmptyStar.png";

function FacultySuggestion() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const suggestionFormContainer = useRef(null);

  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [school, setSchool] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newRatings, setNewRatings] = useState({});

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentSuggestionId, setCurrentSuggestionId] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  async function fetchSuggestions() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/suggestions`
      );
      if (response.data && Array.isArray(response.data)) {
        setSuggestions(response.data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newSuggestion = {
      subjectCode,
      subjectName,
      facultyName,
      school,
      ratings: selectedRating,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/suggestions`,
        newSuggestion
      );
      const addedSuggestion = response.data.suggestion;
      setSuggestions([...suggestions, addedSuggestion]);

      setSubjectCode("");
      setSubjectName("");
      setFacultyName("");
      setSchool("");
      setSelectedRating(0);

      handleCloseNewSuggestion();
    } catch (error) {
      console.error("Error adding suggestion:", error);
    }
  }

  const filterByFacultyName = (suggestion) => {
    if (searchTerm === "") {
      return true;
    }
    return suggestion.facultyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  };

  function handleHomeNavigation() {
    navigate("/mainpage");
  }

  function handleOpenNewSuggestion() {
    suggestionFormContainer.current.classList.add("show");
  }

  function handleCloseNewSuggestion() {
    suggestionFormContainer.current.classList.remove("show");
  }

  function handleOpenRatingModal(id) {
    setCurrentSuggestionId(id);
    setShowRatingModal(true);
  }

  function handleCloseRatingModal() {
    setShowRatingModal(false);
    setCurrentSuggestionId("");
  }

  async function handleRatingUpdate(id, rating) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/suggestions/${id}/updateRating`,
        {
          rating: parseFloat(rating),
          email: user.email, // Include user's email in the request
        }
      );

      const updatedSuggestion = response.data;
      setSuggestions(
        suggestions.map((suggestion) =>
          suggestion._id === id ? updatedSuggestion : suggestion
        )
      );
      setNewRatings({ ...newRatings, [id]: "" });
      setSelectedRating(0);
      handleCloseRatingModal();
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "User has already responded"
      ) {
        alert("You have already responded to this message");
      }
      console.error("Error updating rating:", error);
    }
  }
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div className="faculty-suggestion-container">
      <div className="topBar">
        <button className="home-btn" onClick={handleHomeNavigation}>
          <img src={Home} alt="" />
          Home
        </button>
        <button
          className="add-suggestion-btn"
          onClick={handleOpenNewSuggestion}
        >
          Add Suggestion
        </button>
      </div>

      <div className="filters">
        <div className="leftSide">
          <div className="filters-searchBar">
            <img src={Search} alt="search-icon" />
            <input
              type="search"
              placeholder="Search by Faculty Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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

          <div className="subjectName filter">
            <input type="text" list="subjectName" placeholder="Subject Name" />

            <datalist id="subjectName">
              <select>
                <option value="DataBase Systems">DataBase Systems</option>
              </select>
            </datalist>
          </div>

          <div className="ratings filter">
            <input type="text" list="ratings" placeholder="Ratings" />

            <datalist id="ratings">
              <select>
                <option value="5">5</option>
              </select>
            </datalist>
          </div>
        </div>
      </div>

      <div className="faculty-suggestion-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Faculty Name</th>
              <th>School</th>
              <th>Ratings</th>
              <th>Give Rating</th>
            </tr>
          </thead>
          <tbody>
            {suggestions
              .filter(filterByFacultyName)
              .map((suggestion, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{suggestion.subjectCode}</td>
                  <td>{suggestion.subjectName}</td>
                  <td>{suggestion.facultyName}</td>
                  <td>{suggestion.school}</td>
                  <td>{suggestion.ratings.toFixed(1)}</td>
                  <td>
                    <button
                      className="rating-btn"
                      onClick={() => handleOpenRatingModal(suggestion._id)}
                    >
                      Give Rating
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="table-filters">
        <button className="top-btn">
          <a href="#top">Go to Top</a>
        </button>
      </div>

      {showRatingModal && (
        <div className="rating-modal">
          <div className="rating-modal-content">
            <span className="close" onClick={handleCloseRatingModal}>
              &times;
            </span>
            <h2>Enter Rating</h2>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map((rating) => (
                <img
                  key={rating}
                  src={rating <= selectedRating ? FilledStar : EmptyStar}
                  alt={`${rating} star`}
                  onClick={() => handleStarClick(rating)}
                  className="star-icon"
                />
              ))}
            </div>
            <button
              className="submit-btn"
              onClick={() =>
                handleRatingUpdate(currentSuggestionId, selectedRating)
              }
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="suggestion-form-container" ref={suggestionFormContainer}>
        <div className="form">
          <div className="form-header">
            <p>Suggestion Form</p>
            {/* Close Icon */}
            <Icon
              icon="ic:round-close"
              color="black"
              width="32"
              height="32"
              onClick={handleCloseNewSuggestion}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row1">
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
            <div className="row1">
              <input
                type="text"
                placeholder="Faculty Name"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
              />
              <input
                type="text"
                placeholder="School"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
            <div className="star-rating-container">
              <div className="rating-text">Ratings</div>
              <div className="star-rating-input">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <img
                    key={rating}
                    src={rating <= selectedRating ? FilledStar : EmptyStar}
                    alt={`${rating} star`}
                    onClick={() => setSelectedRating(rating)}
                    className="star-icon"
                  />
                ))}
              </div>
              <div className="rating-text">{selectedRating} / 5</div>
            </div>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FacultySuggestion;
