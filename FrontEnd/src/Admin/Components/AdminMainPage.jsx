import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from 'axios';
import "../CSS/AdminMainPage.css";

function AdminMainPage() {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(false);
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const fileInputRef = useRef(null);
  const contentContainerRef = useRef(null);

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        setErrorMessage('Error fetching users');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const contentContainer = contentContainerRef.current;
    if (contentContainer) {
      contentContainer.style.backgroundColor = isLightMode ? "white" : "rgb(62, 69, 76)";
    }
  }, [isLightMode]);

  const handleHomeNavigation = () => {
    navigate('/mainpage');
  };

  const handleToggle = () => {
    setIsLightMode(prevMode => !prevMode);
  };

  const handleSearchByDistrict = () => {
    const filtered = users.filter(user => user.district.toLowerCase().includes(searchDistrict.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const handleSearchByYear = () => {
    const filtered = users.filter(user => user.year.includes(searchYear));
    setFilteredUsers(filtered);
  };

  const changeTheme = (e) => {
    setIsLightMode(prevMode => !prevMode);
  };

  const handleUploadAchievements = () => {
    setShowAchievementForm(true);
    setShowUploadForm(false);
    setShowUsers(false);
  };

  const handleManageUsers = () => {
    setShowUsers(true);
    setShowUploadForm(false);
    setShowAchievementForm(false);
  };

  const handleAdminSpace = () => {
    setShowUploadForm(false);
    setShowUsers(false);
    setShowAchievementForm(false);
  };

  const handleAbort = () => {
    setShowAchievementForm(false);
    setShowUploadForm(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/uploadachievement`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Image uploaded successfully');
        
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Image upload failed');
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    handleFileChange(e); 
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="content-container" ref={contentContainerRef}>
      <div className="top-contents">
        <button className="uploadAchievements-btn btn" onClick={handleUploadAchievements}>
          Upload Achievements
        </button>
        <button className="manageUsers-btn btn" onClick={handleManageUsers}>
          Manage Users
        </button>
      </div>
      <div className="sectionContainer">
        {!showAchievementForm && !showUploadForm && !showUsers ? (
          <p className="textContent" id="textContent">
            Welcome to the Admin Dashboard. Please select an option from <br />{" "}
            above to get started.
          </p>
        ) : showAchievementForm ? (
          <div className="achievementForm-container" id="achievementForm-container">
            <div className="topContents">
              <p>Achievement Form</p>
            </div>
            <form className="achievement-form" onSubmit={handlePost}>
              <div className="row1">
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, video/mp4"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }} 
                />
                <button
                  type="button"
                  className="upload-btn"
                  onClick={handleFileInputClick}
                >
                  Choose File
                </button>
              </div>
              <div className="row2">
                <button
                  type="button"
                  className="abort-btn"
                  onClick={handleAbort}
                >
                  Abort
                </button>
               
              </div>
            </form>
          </div>
        ) : showUsers ? (
          <div className="userContents">
            <div className="tableContainer">
              <div className="users-table">
                <div className="filters">
                  <div className="leftSide">
                    <input
                      type="text"
                      placeholder="Search by District"
                      value={searchDistrict}
                      onChange={(e) => setSearchDistrict(e.target.value)}
                    />
                    <button onClick={handleSearchByDistrict}>Search District</button>
                    <input
                      type="text"
                      placeholder="Search by Year"
                      value={searchYear}
                      onChange={(e) => setSearchYear(e.target.value)}
                    />
                    <button onClick={handleSearchByYear}>Search Year</button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Reg No</th>
                      <th>Year</th>
                      <th>District</th>
                      <th>Department</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.regno}</td>
                        <td>{user.year}</td>
                        <td>{user.district}</td>
                        <td>{user.department}</td>
                        <td>{user.phoneNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div>Content for other sections to be decided...</div>
        )}
      </div>
      <div className="bottomContents">
        <div className="toggle-btn">
          <div className="round" onClick={changeTheme}></div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminMainPage;
