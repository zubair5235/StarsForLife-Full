import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Start from "./Student/Components/Start";
import StudentLogin from "./Student/Components/StudentLogin";
import StudentMainPage from "./Student/Components/StudentMainPage";
import FacultyReview from "./Student/Components/FacultyReview";
import FacultySuggestion from "./Student/Components/FacultySuggestion";
import TimeTableMaker from "./Student/Components/TimeTableMaker";
import Btech from "./Student/Components/Btech";
import Mtech from "./Student/Components/Mtech";
import Arts from "./Student/Components/Arts";
import Projects from "./Student/Components/Projects";
import Meetings from "./Student/Components/Meetings";
import Messages from "./Student/Components/Messages";
import StarsDay from "./Student/Components/StarsDay";
import Archives from "./Student/Components/Archives";
import Calculators from "./Student/Components/Calculators";
import Dudes from "./Student/Components/Dudes";
import ProfileSettings from "./Student/Components/ProfileSettings";
import AccountSettings from "./Student/Components/AccountSettings";



import AdminLogin from "./Admin/Components/AdminLogin";

import AlumniMainPage from "./Alumni/Components/AlumniMainPage";
import AlumniLogin from "./Alumni/Components/AlumniLogin";
import AdminMainPage from "./Admin/Components/AdminMainPage";

import CoordinatorMainPage from './Coordinator/Components/CoordinatorMainPage';
import CoordinatorLogin from './Coordinator/Components/CoordinatorLogin';
import { UserProvider } from './Student/context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <div className="permanentComponents"></div>
          <div className="temporaryComponents">
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/studentlogin" element={<StudentLogin />} />
              <Route path="/mainpage" element={<StudentMainPage />} />
              <Route path="/ffcs/facultyreview" element={<FacultyReview />} />
              <Route path="/ffcs/facultysuggestion" element={<FacultySuggestion />} />
              <Route path="/ffcs/timetablemaker" element={<TimeTableMaker />} />
              <Route path="/materials/btech" element={<Btech />} />
              <Route path="/materials/mtech" element={<Mtech />} />
              <Route path="/materials/arts" element={<Arts />} />
              <Route path="/materials/projects" element={<Projects />} />
              <Route path="/sc/meetings" element={<Meetings />} />
              <Route path="/sc/messages" element={<Messages />} />
              <Route path="/events/starsday" element={<StarsDay />} />
              <Route path="/events/archives" element={<Archives />} />
              <Route path="/others/calculators" element={<Calculators />} />
              <Route path="/others/dudes" element={<Dudes />} />
              <Route path="/profile/profilesettings" element={<ProfileSettings />} />
              <Route path="/profile/accountsettings" element={<AccountSettings />} />
              
              <Route path="/alumnilogin" element={<AlumniLogin/>} />
            
              <Route path="/alumnimainpage" element={<AlumniMainPage />} />
              <Route path="/adminlogin" element={<AdminLogin/>} />
            
              <Route path="/adminmainpage" element={<AdminMainPage />} />
              <Route path="/coordinatormainpage" element={<CoordinatorMainPage />} />
              <Route path="/coordinatorlogin" element={<CoordinatorLogin/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;