import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import "../CSS/AlumniLogin.css";

import Logo from "../Assets/Logo.png";

function AlumniLogin() {
  const Navigate = useNavigate();

  var topContainer;
  var bottomContainer;
  var loginContainer;
  var signupContainer;

  function fetchElement() {
    topContainer = document.getElementById("topContainer");
    bottomContainer = document.getElementById("bottomContainer");
    loginContainer = document.getElementById("loginContainer");
    signupContainer = document.getElementById("signupContainer");
  }

  setTimeout(fetchElement, 2000);

  function toHome() {
    Navigate("/");
  }
  function Authenticate() {
    Navigate("/alumnimainpage");
  }
  function handleSignUp() {
    topContainer.style.display = "none";
    topContainer.style.height = "0%";
    bottomContainer.style.height = "100%";
    loginContainer.style.display = "none";
    signupContainer.style.display = "flex";
  }
  function closeSignUp() {
    topContainer.style.display = "flex";
    topContainer.style.height = "20%";
    bottomContainer.style.height = "80%";
    loginContainer.style.display = "flex";
    signupContainer.style.display = "none";
  }
  return (
    <>
      <div className="alumniLogin-container">
        <div className="topContainer" id="topContainer">
          <div className="leftSide">
            <img className="logo" src={Logo} alt="Logo" />
          </div>
          <div className="rightSide">
            <button className="home-btn" onClick={toHome}>
              Home
            </button>
          </div>
        </div>
        <div className="bottomContainer" id="bottomContainer">
          <div className="loginContainer" id="loginContainer">
            <div className="firstHalf">
              <form onSubmit={Authenticate}>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
              </form>
            </div>
            <div className="secondHalf">
              <Link>Forget Password?</Link>
              <div className="line"></div>
              <button className="signup-btn" onClick={handleSignUp}>
                Create New Account
              </button>
            </div>
          </div>
          <div className="signUp-container" id="signupContainer">
            <div className="signUp-form">
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
              <form action="" className="signup-form">
                <div className="row1">
                  <div className="innerrow1">
                    <input type="text" placeholder="Name" />
                    <input type="number" placeholder="Year" />
                  </div>
                  <div className="innerrow2">
                    <input type="text" placeholder="District" />
                    <input type="text" placeholder="Department" />
                  </div>
                </div>
                <div className="row2">
                  <input type="tel" placeholder="Phone Number" />
                  <input type="email" placeholder="Email ID" />
                </div>
                <div className="row3">
                  <input type="password" placeholder="Password" />
                  <input type="password" placeholder="Confirm Password" />
                </div>
                <div className="row4">
                  <button className="signup-btn">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlumniLogin;