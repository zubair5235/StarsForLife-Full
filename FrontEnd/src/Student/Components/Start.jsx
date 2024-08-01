import { Link } from "react-router-dom";
import "../CSS/Start.css";

import logo from "../Assets/Logo.png";
import enter from "../Assets/enter 1.png";

function Start() {
  return (
    <>
      <div className="start-container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="logins-container">
          <div className="logins student">
            <h2>Student</h2>
            <Link to="/studentlogin">
              <img src={enter} alt="enter-icon" />
            </Link>
          </div>

          <div className="logins admin">
            <h2>Admin</h2>
            <Link to="">
              {" "}
              {/*/adminlogin */}
              <img src={enter} alt="enter-icon" />
            </Link>
          </div>

          <div className="logins alumni">
            <h2>Alumni</h2>
            <Link to="">
              {" "}
              {/*/alumnilogin */}
              <img src={enter} alt="enter-icon" />
            </Link>
          </div>

          <div className="logins sc">
            <h2>Stars Coordinator</h2>
            <Link to="">
              {/* /coordinatorlogin*/}
              <img src={enter} alt="enter-icon" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Start;
