import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Home from "../Assets/Home Icon.jpg";
import Design from "../Assets/Design.png";
import Developer from "../Assets/Developer.png";
import "../CSS/ProfileSettings.css";

function ProfileSettings() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user.name,
    year: user.year,
    department: user.department,
    phoneNumber: user.phoneNumber,
    district: user.district,
    regno: user.regno,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/usersupdate/${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  function handleHomeNavigation() {
    navigate("/mainpage");
  }

  return (
    <>
      <div className="profile-settings-container">
        <div className="topBar">
          <div className="leftSide">
            <button className="home-btn" onClick={handleHomeNavigation}>
              <img src={Home} alt="" />
              Home
            </button>
          </div>
          <div className="rightSide">
            <div className="userNameDisplay">
              <div className="greetings">
                <p>Welcome</p>
                <h6>{user.name}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="main-contents">
          <div className="updationForm">
            <button className="update-btn" onClick={handleSubmit}>
              Update Details
            </button>
            <form onSubmit={handleSubmit}>
              <div className="row1 row">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="row2 row">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  id="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
              <div className="row3 row">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div className="row4 row">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="row5 row">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  id="district"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>
              <div className="row5 row">
                <label htmlFor="regno">Registration Number</label>
                <input
                  type="text"
                  id="regno"
                  value={formData.regno}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          {updateSuccess && (
            <div className="popup">
              <p>Details updated successfully!</p>
            </div>
          )}
          <div className="sideBar">
            <div className="top-contents">
              <div
                className="profile-settings links-div"
                style={{ backgroundColor: "#1784C7" }}
              >
                <Link style={{ color: "white" }}>Profile Settings</Link>
              </div>
              <div className="account-settings links-div">
                <Link to="/profile/accountsettings">Account Settings</Link>
              </div>
            </div>
            <div className="bottom-contents">
              <div className="credits-card">
                <div className="line">
                  <img src={Design} alt="Design logo" />
                  <p>Frontend Developer</p>
                  <img src={Design} alt="Design logo" />
                </div>
                <div className="line p">
                  <p>Mohamed Zubair</p>
                </div>
                <div className="line ">
                  <Link to="https://connectwithzubair.netlify.app/">
                    More...
                  </Link>
                </div>
                <div className="line">
                  <img src={Developer} alt="Developer logo" />
                  <p>Backend Developer</p>
                  <img src={Developer} alt="Developer logo" />
                </div>
                <div className="line p">Madasamy </div>
                <div className="line ">
                  <Link to="https://madasamygithub.github.io/portfolio/">
                    More...
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>All Rights Reserved &copy; 2024</p>
        </div>
      </div>
    </>
  );
}

export default ProfileSettings;
