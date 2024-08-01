import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import "../CSS/StudentLogin.css";
import Logo from "../Assets/Logo.png";
import LoginGirl from "../Assets/Girl.png";
import LoginBoy from "../Assets/Boy.png";
import { UserContext } from "../context/UserContext";

function StudentLogin() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formDataSignup, setFormDataSignup] = useState({
    name: "",
    year: "",
    department: "",
    regno: "",
    phone: "",
    district: "",
    email: "",
    password: "",
  });

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const [formDataOTP, setFormDataOTP] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeSignup = (e) => {
    setFormDataSignup({ ...formDataSignup, [e.target.name]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleChangeOTP = (e) => {
    setFormDataOTP({ ...formDataOTP, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/signup`,
        formDataSignup
      );
      setLoading(false);

      if (response.status === 201) {
        setMessage("User registered successfully");
        setTimeout(() => {
          setMessage("");
          document.getElementById("signup").style.display = "none";
        }, 3000);
      } else {
        setMessage("User already exists");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setFailed(true);
      setMessage("Failed to register user");
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userCredentials = {
      email: formDataLogin.email,
      password: formDataLogin.password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        userCredentials
      );
      setLoading(false);

      if (response.status === 200) {
        if (response.data.message === "Login successful") {
          setUser(response.data.user);
          navigate("/mainpage");
        }
      } else if (response.status === 400) {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Invalid credentials");
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/send-otp`,
        { email: formDataOTP.email }
      );
      setLoading(false);

      if (response.status === 200) {
        setMessage("OTP sent to your email");
        setOtpSent(true);
      } else {
        setErrorMessage("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Failed to send OTP");
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/verify-otp`,
        {
          email: formDataOTP.email,
          otp: formDataOTP.otp,
          newPassword: formDataOTP.newPassword,
        }
      );
      setLoading(false);

      if (response.status === 200) {
        setMessage("Password reset successful");
        setOtpSent(false);
        setShowForgotPassword(false);
      } else {
        setErrorMessage("Failed to reset password");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("Failed to reset password");
      setLoading(false);
    }
  };

  const closeSignUp = () => {
    document.getElementById("signup").style.display = "none";
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
  };

  function toHome() {
    navigate("/");
  }

  return (
    <div className="studentLogin-container">
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="home-btn-container">
        <button className="home-btn" onClick={toHome}>
          {" "}
          Home{" "}
        </button>
      </div>
      <div className="contents-container">
        <div className="paragraph">
          <p>
            {/* Fear of Exams? Can’t Find a right material to SCORE well? Want to
            know what coordinator is  telling? Want to get the email notification for each meeting?
            Want to Calculate GPA and CGPA? Want to
            find the district mate? Help from seniors? Hear it from Alumni’s
            .... Come Let’s Talk about What’s. in your mind? Want to store your Stars day memories?
            Tired of sending google forms for registration.... No problem we have solutions for
            that... */}
            Fear of FFCS? Can’t Find a right material to SCORE well? Want to
            know what she’s telling? Want to Calculate GPA and CGPA? Want to
            find a travel partner? Help from seniors? Hear it from Alumni’s ....
            Come Let’s Talk about What’s in your mind? Find Your Project Buddy?
            Fear of Placements .... No problem we have solutions for that...
          </p>
          <a href="#login">
            <button className="scrollDown-btn">Continue</button>
          </a>
        </div>

        <div className="login-container">
          <div className="loginForm" id="login">
            <form onSubmit={handleSignIn}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formDataLogin.email}
                onChange={handleChangeLogin}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formDataLogin.password}
                onChange={handleChangeLogin}
                required
              />
              <button type="submit">Login</button>
            </form>
            {errorMessage && (
              <div className="error-msg-container">
                <h2 className="error-msg">{errorMessage}</h2>
                <br />
              </div>
            )}
            <Link to="#" onClick={() => setShowForgotPassword(true)}>
              Forgot Password?
            </Link>
            <br />
            <br />
            <div className="line"></div>
            {!errorMessage && <br />}
            <button
              className="signUp-btn"
              onClick={() =>
                (document.getElementById("signup").style.display = "flex")
              }
            >
              Create New Account
            </button>
            <img src={LoginGirl} alt="login girl logo" className="loginGirl" />
            <img src={LoginBoy} alt="login boy logo" className="loginBoy" />
          </div>
        </div>

        <div className="signUp-container" id="signup">
          <div className="signUpForm">
            <div className="topContents">
              <div className="formTitle">Sign Up</div>
              <div className="close-icon">
                <Icon
                  icon="carbon:close-filled"
                  width="32"
                  height="32"
                  onClick={closeSignUp}
                />
              </div>
            </div>

            <form onSubmit={handleCreateAccount}>
              <div className="row1 row">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formDataSignup.name}
                  onChange={handleChangeSignup}
                  required
                />
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  value={formDataSignup.year}
                  onChange={handleChangeSignup}
                  required
                />
              </div>
              <div className="row2 row">
                <input
                  type="text"
                  name="regno"
                  placeholder="Register Number"
                  value={formDataSignup.regno}
                  onChange={handleChangeSignup}
                  required
                />
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formDataSignup.department}
                  onChange={handleChangeSignup}
                  required
                />
              </div>
              <div className="row2 row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formDataSignup.phone}
                  onChange={handleChangeSignup}
                  required
                />
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={formDataSignup.district}
                  onChange={handleChangeSignup}
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formDataSignup.email}
                onChange={handleChangeSignup}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formDataSignup.password}
                onChange={handleChangeSignup}
                required
              />
              <button type="submit" className="signUp-btn">
                Sign Up
              </button>
            </form>
            {!failed && message && <div className="message">{message}</div>}
            {failed && <div className="message err">{message}</div>}
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <div className="forgot-password-container" id="signup">
          <div className="forgotPassword-form">
            <div className="topContents">
              <div className="formTitle">Forgot Password</div>
              <div className="close-icon">
                <Icon
                  icon="carbon:close-filled"
                  width="32"
                  height="32"
                  onClick={closeForgotPassword}
                />
              </div>
            </div>
            {!otpSent ? (
              <form onSubmit={handleSendOTP}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formDataOTP.email}
                  onChange={handleChangeOTP}
                  required
                />
                <button type="submit" className="signUp-btn">
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP}>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formDataOTP.otp}
                  onChange={handleChangeOTP}
                  required
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formDataOTP.newPassword}
                  onChange={handleChangeOTP}
                  required
                />
                <button type="submit" className="signUp-btn">
                  Verify OTP & Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentLogin;
