
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionImage from './Components/questionComponent/QuestionComponent';
// import Sidebar from './Components/sidebarComponent/sidebarComponent';
// import Dashboard from './Components/DashComponents/DashboardComponent';
import LoginPage from './Components/authComponents/LoginComponents';
import SignupPage from './Components/authComponents/SignupComponents';

function App() {
  return (
    <>

    {/* <div className="flex">
      <Sidebar />
      <Dashboard />
    </div> */}

    <Router>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/question" element={<QuestionImage />} />


      </Routes>

    </Router>

    </>

  );
}

export default App;
