import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Message.css";

import Home from "../Assets/Home Icon.jpg";
import Search from "../Assets/Filter-SearchIcon.png";
import { UserContext } from "../context/UserContext";

function Messages() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [errorMessages, setErrorMessages] = useState(null);
  const [responseCount, setResponseCount] = useState({});

  useEffect(() => {
    async function fetchMessageHistory() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/message-history`
        );
        if (response.status === 200) {
          setMessages(response.data);
          setLoadingMessages(false);
        } else {
          setErrorMessages("Failed to fetch message history");
          setLoadingMessages(false);
        }
      } catch (error) {
        console.error("Error fetching message history:", error);
        setErrorMessages("Failed to fetch message history");
        setLoadingMessages(false);
      }
    }

    fetchMessageHistory();
  }, []);

  const handleRespond = async (messageId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/messages/${messageId}/respond`,
        { email: user.email }
      );
      if (response.status === 200) {
        alert("Response submitted successfully");

        setResponseCount((prevCounts) => ({
          ...prevCounts,
          [messageId]: (prevCounts[messageId] || 0) + 1,
        }));
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      if (
        error.response &&
        error.response.data.message === "User has already responded"
      ) {
        alert("You have already responded to this message");
      } else {
        alert("Failed to submit response");
      }
    }
  };

  const handleHomeNavigation = () => {
    navigate("/mainpage");
  };

  return (
    <>
      <div className="meetings-container">
        <div className="topBar">
          <button className="home-btn" onClick={handleHomeNavigation}>
            <img src={Home} alt="" />
            Home
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
            <div className="time filter">
              <input type="text" list="time" placeholder="From When" />
              <datalist id="time">
                <select>
                  <option value="Recent">Recent</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </datalist>
            </div>
          </div>
        </div>

        <div className="meetings-table">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Batch</th>
                <th>Message</th>

                <th>Respond</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{message.year}</td>
                  <td>{message.message}</td>

                  <td>
                    <button
                      className="response-btn"
                      onClick={() => handleRespond(message._id)}
                    >
                      Respond
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
      </div>
    </>
  );
}

export default Messages;
