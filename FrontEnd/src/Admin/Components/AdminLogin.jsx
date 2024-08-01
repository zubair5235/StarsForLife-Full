import { useNavigate, Link } from "react-router-dom";
import "../CSS/AdminLogin.css";

import Logo from "../Assets/Logo.png";

function AdminLogin() {
  const Navigate = useNavigate();
  function toHome() {
    Navigate("/");
  }
  function Authenticate() {
    Navigate("/adminmainpage");
  }
  return (
    <>
      <div className="adminLogin-container">
        <div className="topContainer">
          <div className="leftSide">
            <img className="logo" src={Logo} alt="Logo" />
          </div>
          <div className="rightSide">
            <button className="home-btn" onClick={toHome}>
              Home
            </button>
          </div>
        </div>
        <div className="bottomContainer">
          <div className="loginContainer">
            <form onSubmit={Authenticate}>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
            <Link>Forgetten Password?</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;