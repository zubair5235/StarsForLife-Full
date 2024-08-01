import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/AlumniMainPage.css";

function AlumniMainPage() {
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(false);
  const [showRegForm, setShowRegForm] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState({
    success: false,
    error: false,
  });
  const alumniContentsRef = useRef();

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    regNo: '',
    name: '',
    batch: '',
    branch: '',
    district: '',
    gender: '',
    mobileNumber: '',
    additionalMembers: '',
    foodType: '',
    numberOfMales: '',
    numberOfFemales: '',
    arrivingDate: '',
    additionalInfo: '',
  });

  useEffect(() => {
    const alumniContents = alumniContentsRef.current;
    if (alumniContents) {
      alumniContents.style.backgroundColor = isLightMode
        ? "white"
        : "rgb(62, 69, 76)";
    }
  }, [isLightMode]);

   

  function changeTheme(e) {
    const toggle = e.target;
    toggle.classList.toggle("right");
    setIsLightMode((prevMode) => !prevMode);
  }

  function handleReg() {
    setShowRegForm(true);
  }

  function handleAbort() {
    setShowRegForm(false);
    setRegistrationStatus({ success: false, error: false });
  }

  function hanldeLogout() {
    navigate("/");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, formData);

      if (response.status === 200) {
        setRegistrationStatus({ success: true, error: false });
        setShowRegForm(false);
      } else {
        setRegistrationStatus({ success: false, error: true });
      }
    } catch (error) {
      console.error('Error registering:', error);
      setRegistrationStatus({ success: false, error: true });
    }


      
  };

  return (
    <>
      <div className="alumniContents" ref={alumniContentsRef}>
        <div className="top-contents">
          <button className="register-btn btn" onClick={handleReg}>
            Register
          </button>
        </div>

        <div className="section-container">
          {!showRegForm ? (
            <p className="text-content">Welcome Username</p>
          ) : (
            <div className="registerForm-container">
              <div className="top-contents">Registration Form</div>
              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="input-contents">
                  <div className="row1">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="regNo"
                      placeholder="Reg No"
                      value={formData.regNo}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row2">
                    <input
                      type="number"
                      name="batch"
                      placeholder="Batch"
                      value={formData.batch}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="branch"
                      placeholder="Branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="district"
                      placeholder="District"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row3">
                    <input
                      type="text"
                      name="gender"
                      placeholder="Gender"
                      list="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    />
                    <datalist id="gender">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </datalist>
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="number"
                      name="additionalMembers"
                      placeholder="Number of Additional Members"
                      value={formData.additionalMembers}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row4">
                    <input
                      type="text"
                      name="foodType"
                      placeholder="Food Type"
                      list="food-type"
                      value={formData.foodType}
                      onChange={handleChange}
                      required
                    />
                    <datalist id="food-type">
                      <option value="Non-Veg">Non-Veg</option>
                      <option value="Veg">Veg</option>
                    </datalist>
                    <input
                      type="number"
                      name="numberOfMales"
                      placeholder="Number of Males"
                      value={formData.numberOfMales}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="number"
                      name="numberOfFemales"
                      placeholder="Number of Females"
                      value={formData.numberOfFemales}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row5">
                    <input
                      type="date"
                      name="arrivingDate"
                      placeholder="Arriving Date"
                      value={formData.arrivingDate}
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      name="additionalInfo"
                      placeholder="Any other information"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="button-row">
                  <button type="button" className="abort-btn" onClick={handleAbort}>
                    Abort
                  </button>
                  <button type="submit" className="register-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AlumniMainPage;
