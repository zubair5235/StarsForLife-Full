import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/CoordinatorMainPage.css";

function CoordinatorMainPage() {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(false);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showMeetingHistory, setShowMeetingHistory] = useState(false);
  const [showMessageHistory, setShowMessageHistory] = useState(false);
  const [showStarsReg, setShowStarsReg] = useState(false);
  const [message, setMessage] = useState("");
  const [year, setYear] = useState("");

  const [statistics, setStatistics] = useState([]);
  const [error, setError] = useState("");

  const [meetingDetails, setMeetingDetails] = useState({
    date: "",
    time: "",
    venue: "",
    title: "",
    to: "",
  });

  const [messageDetails, setMessageDetails] = useState({
    message: "",
    to: "",
  });

  const [meetings, setMeetings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [errorMeetings, setErrorMeetings] = useState(null);
  const [errorMessages, setErrorMessages] = useState(null);

  useEffect(() => {
    async function fetchMeetingHistory() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/meeting-history`);

        if (response.status === 200) {
          setMeetings(response.data); // Assuming response.data is an array of meetings
          setLoadingMeetings(false);
        } else {
          setErrorMeetings("Failed to fetch meeting history");
          setLoadingMeetings(false);
        }
      } catch (error) {
        console.error("Error fetching meeting history:", error);
        setErrorMeetings("Failed to fetch meeting history");
        setLoadingMeetings(false);
      }
    }

    fetchMeetingHistory();
  }, []);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/statistics`);
        if (response.status === 200) {
          setStatistics(response.data);
        } else {
          setError("Failed to fetch statistics");
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setError("Failed to fetch statistics");
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    async function fetchMessageHistory() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/message-history`);

        if (response.status === 200) {
          setMessages(response.data); // Assuming response.data is an array of messages
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

  function changeTheme(e) {
    const toggle = e.target;
    toggle.classList.toggle("right");
    setIsLightMode((prevMode) => !prevMode);
  }

  function handleCreateMeeting() {
    setShowMeetingForm(true);
    setShowMessageForm(false);
    setShowMeetingHistory(false);
    setShowMessageHistory(false);
    setShowStarsReg(false);
  }

  function handleSendMessage() {
    setShowMessageForm(true);
    setShowMeetingForm(false);
    setShowMeetingHistory(false);
    setShowMessageHistory(false);
    setShowStarsReg(false);
  }

  function handleMeetingHistory() {
    setShowMeetingHistory(true);
    setShowMessageHistory(false);
    setShowMeetingForm(false);
    setShowMessageForm(false);
    setShowStarsReg(false);
  }

  function handleMessageHistory() {
    setShowMessageHistory(true);
    setShowMeetingHistory(false);
    setShowMeetingForm(false);
    setShowMessageForm(false);
    setShowStarsReg(false);
  }

  function handleStarsReg() {
    setShowStarsReg(true);
    setShowMessageHistory(false);
    setShowMeetingHistory(false);
    setShowMeetingForm(false);
    setShowMessageForm(false);
  }

  function handleAbort() {
    setShowMeetingForm(false);
    setShowMessageForm(false);
  }

  function handleMeetingDetailChange(e) {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  function handleMessageDetailChange(e) {
    const { name, value } = e.target;
    setMessageDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/send-emailmeeting`,
        meetingDetails
      );

      if (response.status === 200) {
        alert("Meeting scheduled and emails sent successfully");
      } else {
        alert("Failed to schedule meeting and send emails");
      }
    } catch (error) {
      console.error("Error scheduling meeting and sending emails:", error);
      alert("Failed to schedule meeting and send emails");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-email`, {
        message,
        year,
      });

      if (response.status === 200) {
        alert("Emails sent successfully");
      } else {
        alert("Failed to send emails");
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Failed to send emails");
    }
  };

  const handleDeleteMeeting = async (meetingId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/meetings/${meetingId}`);

      if (response.status === 200) {
        alert("Meeting deleted successfully");
        // Update meetings state by removing the deleted meeting
        setMeetings((prevMeetings) =>
          prevMeetings.filter((meeting) => meeting._id !== meetingId)
        );
      } else {
        alert("Failed to delete meeting");
      }
    } catch (error) {
      console.error("Error deleting meeting:", error);
      alert("Failed to delete meeting");
    }
  };

  function handleLogout() {
    navigate("/");
  }

  return (
    <div className="contentContainer">
      <div className="topContents">
        <button className="meeting-btn btn" onClick={handleCreateMeeting}>
          Schedule Meeting
        </button>
        <button className="meetingHistory-btn btn" onClick={handleMeetingHistory}>
          Meeting History
        </button>
        <button className="starsdayRegistration-btn btn" onClick={handleStarsReg}>
          StarsDay-Reg
        </button>
        <button className="messageHistory-btn btn" onClick={handleMessageHistory}>
          Message History
        </button>
        <button className="message-btn btn" onClick={handleSendMessage}>
          Send Message
        </button>
      </div>
      <div className="sectionContainer">
        {!showMeetingForm &&
          !showMessageForm &&
          !showMeetingHistory &&
          !showStarsReg &&
          !showMessageHistory ? (
            <p className="textContent" id="textContent">
              Welcome to the Coordinator Dashboard. Please select an option from
              <br /> above to get started.
            </p>
          ) : showMeetingForm ? (
            <div className="meetingForm-container">
              <div className="topContents">
                <p>Meeting Form</p>
              </div>
              <form className="meeting-form" onSubmit={handleSchedule}>
                <div className="row1">
                  <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    value={meetingDetails.date}
                    onChange={handleMeetingDetailChange}
                    required
                  />
                  <input
                    type="time"
                    name="time"
                    placeholder="Time"
                    value={meetingDetails.time}
                    onChange={handleMeetingDetailChange}
                    required
                  />
                  <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    value={meetingDetails.venue}
                    onChange={handleMeetingDetailChange}
                    required
                  />
                </div>
                <div className="row2">
                  <input
                    type="text"
                    name="title"
                    placeholder="Meeting Title"
                    value={meetingDetails.title}
                    onChange={handleMeetingDetailChange}
                    required
                  />
                  <input
                    type="text"
                    list="year"
                    name="to"
                    placeholder="To"
                    value={meetingDetails.to}
                    onChange={handleMeetingDetailChange}
                    required
                  />
                  <datalist id="year">
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </datalist>
                </div>
                <div className="row3">
                  <button type="button" className="abort-btn" onClick={handleAbort}>
                    Abort
                  </button>
                  <button type="submit" className="schedule-btn">
                    Schedule
                  </button>
                </div>
              </form>
            </div>
          ) : showMessageForm ? (
            <div className="messageForm-container">
              <div className="topContents">
                <p>Message Form</p>
              </div>
              <form action="" className="message-form" onSubmit={handleSend}>
                <div className="row1">
                  <textarea
                    name="message"
                    rows="15"
                    placeholder="Type Your Message Here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="row2">
                  <input
                    type="text"
                    list="year"
                    placeholder="To"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                  <datalist id="year">
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </datalist>
                </div>
                <div className="row3">
                  <button className="abort-btn" onClick={handleAbort}>
                    Abort
                  </button>
                  <button className="send-btn" type="submit">Send</button>
                </div>
              </form>
            </div>
          ) : showMeetingHistory ? (
            <div className="meetingHistory-table">
              {loadingMeetings && <p>Loading meetings...</p>}
              {errorMeetings && <p>{errorMeetings}</p>}
              {!loadingMeetings && !errorMeetings && meetings.length === 0 && <p>No meetings found</p>}
              {!loadingMeetings && !errorMeetings && meetings.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Venue</th>
                      <th>To</th>
                      <th>Meeting Title</th>
                      <th>Responses</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.map((meeting, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{meeting.date}</td>
                        <td>{meeting.time}</td>
                        <td>{meeting.venue}</td>
                        <td>{meeting.to}</td>
                        <td>{meeting.title}</td>
                        <td>{meeting.responses}</td>
                        <td>
                          <button onClick={() => handleDeleteMeeting(meeting._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : showMessageHistory ? (
            <div className="messageHistory-table">
              {loadingMessages && <p>Loading messages...</p>}
              {errorMessages && <p>{errorMessages}</p>}
              {!loadingMessages && !errorMessages && messages.length === 0 && <p>No messages found</p>}
              {!loadingMessages && !errorMessages && messages.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Batch</th>
                      <th>Message</th>
                      <th>Responses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((message, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{message.year}</td>
                        <td>{message.message}</td>
                        <td>{message.responses}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="table-container">
              <div className="starsReg-table">
                <h2>Alumni Statistics</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Batch</th>
                      <th>Registration count</th>
                      <th>Males</th>
                      <th>Females</th>
                      <th>Additional Members</th>
                      <th>Total Males</th>
                      <th>Total Females</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statistics.map((stat) => (
                      <tr key={stat._id}>
                        <td>{stat._id}</td>
                        <td>{stat.count}</td>
                        <td>{stat.males}</td>
                        <td>{stat.females}</td>
                        <td>{stat.additionalMembers}</td>
                        <td>{stat.totalMales}</td>
                        <td>{stat.totalFemales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
      <div className="bottomContents">
        <div className="toggle-btn">
          <div className="round" onClick={changeTheme}></div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default CoordinatorMainPage;
