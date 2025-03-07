import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";
import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="header">
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Dashboard</Link>
            <Link to="/sales" className="navbar-link">Sales</Link>
            <Link to="/inventory" className="navbar-link">Inventory</Link>
            <Link to="/settings" className="navbar-link">Settings</Link>
          </div>
          <div className="user-info">
            <img
              src="https://www.w3schools.com/w3images/avatar2.png" 
              alt="Profile"
              className="profile-pic"
            />
            <span className="user-name">Kiana Joaquim</span>
            <button className="logout-btn">Log Out</button>
          </div>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
