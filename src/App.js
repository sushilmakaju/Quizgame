
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionImage from './Components/questionComponent/QuestionComponent';
// import Sidebar from './Components/sidebarComponent/sidebarComponent';
// import Dashboard from './Components/DashComponents/DashboardComponent';
import LoginPage from './Components/authComponents/LoginComponents';
import SignupPage from './Components/authComponents/SignupComponents';
import Dashboard from './Components/Dashboard/Dashboard';
import GameHistory from './Components/historyComponents/History';
import Leaderboard from './Components/leaderboardComponents/leaderboard';
// import ProtectedRoute from './protectedRoutes/protectedRoutes';


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
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
        <Route path="/history" element={<GameHistory />} />
        <Route path="/leaderboard" element={<Leaderboard />} />



      </Routes>

    </Router>

    </>

  );
}

export default App;
