import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../CSS/AccountSettings.css";
import Home from "../Assets/Home Icon.jpg";
import Design from "../Assets/Design.png";
import Developer from "../Assets/Developer.png";
/* import bottom from "../Assets/bottom.png"; */

function ProfileSettings() {
  const { user, setUser } = useContext(UserContext);
  console.log(user.name);
  const [formData, setFormData] = useState({
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const Navigate = useNavigate();

  function handleHomeNavigation() {
    Navigate("/mainpage");
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
    if (formData.newPassword !== formData.confirmNewPassword) {
      setUpdateError("Passwords does not match");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/usersupdate/${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setUpdateSuccess(true);
        setPasswordChangeSuccess(true);
        setUpdateError(null);
        setTimeout(() => {
          setUpdateSuccess(false);
          setPasswordChangeSuccess(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        setUpdateError(errorData.message || "Error updating credentials");
      }
    } catch (error) {
      setUpdateError("Error updating credentials: " + error.message);
    }
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
          <div className="updationForm-as">
            <form onSubmit={handleSubmit}>
              <div className="row1 row">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="row2 row">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="row3 row">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="row4 row">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                />
              </div>
              <button className="update-credentials-btn" type="submit">
                Update Credentials
              </button>
            </form>
          </div>

          {updateSuccess && (
            <div className="popup">
              <p>Credentials updated successfully!</p>
              <button
                className="close-btn"
                onClick={() => {
                  setUpdateSuccess(false);
                }}
              >
                Done
              </button>
            </div>
          )}
          {updateError && (
            <div className="popup error">
              <p>{updateError}</p>
              <button
                className="close-btn"
                onClick={() => {
                  setUpdateError(false);
                }}
              >
                Retry
              </button>
            </div>
          )}
          {passwordChangeSuccess && (
            <div className="popup success">
              <p>Password changed successfully!</p>
              <button
                className="close-btn"
                onClick={() => {
                  setPasswordChangeSuccess(false);
                }}
              >
                Done
              </button>
            </div>
          )}

          <div className="sideBar">
            <div className="top-contents">
              <div className="profile-settings links-div">
                <Link to="/profile/profilesettings">Profile Settings</Link>
              </div>
              <div
                className="account-settings links-div"
                style={{ backgroundColor: "#1784C7" }}
              >
                <Link style={{ color: "white" }}>Account Settings</Link>
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
                <div className="line">
                  <Link to="https://connectwithzubair.netlify.app/">
                    More...
                  </Link>
                </div>
                <div className="line">
                  <img src={Developer} alt="Developer logo" />
                  <p>Backend Developer</p>
                  <img src={Developer} alt="Developer logo" />
                </div>
                <div className="line p">Madasamy</div>
                <div className="line">
                  <Link to="https://madasamygithub.github.io/portfolio/">
                    More...
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>All Rights Reserved &copy; 2024 </p>
        </div>
      </div>
    </>
  );
}

export default ProfileSettings;
