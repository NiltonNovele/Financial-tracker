import React, { useState } from "react";
import "../styles/Settings.css"; 

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("editProfile");

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
  };

  const handleSoundToggle = () => {
    setSound(!sound);
  };

  return (
    <div className={`settings-page ${theme}`}>
      <aside className="settings-sidebar">
        <h2>Settings</h2>
        <nav>
          <ul>
            <li className={activeSection === "editProfile" ? "active" : ""} onClick={() => setActiveSection("editProfile")}>Edit Profile</li>
            <li className={activeSection === "general" ? "active" : ""} onClick={() => setActiveSection("general")}>General Settings</li>
            <li className={activeSection === "privacy" ? "active" : ""} onClick={() => setActiveSection("privacy")}>Privacy & Security</li>
          </ul>
        </nav>
        <button className="logout-btn">Log Out</button>
      </aside>

      <main className="settings-content">
        {activeSection === "editProfile" && (
          <div className="section">
            <h3>Edit Profile</h3>
            <button className="edit-btn">Edit Profile</button>
          </div>
        )}

        {activeSection === "general" && (
          <div className="section">
            <h3>General Settings</h3>
            <div className="setting-option">
              <label>Notifications</label>
              <input type="checkbox" checked={notifications} onChange={handleNotificationsToggle} />
            </div>
            <div className="setting-option">
              <label>Sound</label>
              <input type="checkbox" checked={sound} onChange={handleSoundToggle} />
            </div>
            <div className="setting-option">
              <label>Theme</label>
              <button onClick={handleThemeToggle} className="theme-btn">
                {theme === "light" ? "Switch to Dark" : "Switch to Light"}
              </button>
            </div>
          </div>
        )}
        
        {activeSection === "privacy" && (
          <div className="section">
            <h3>Privacy & Security</h3>
            <p>Manage your privacy and security settings here.</p>
            <button className="report-btn">Manage Security</button>
          </div>
        )}

        <footer className="watermark">SynctechX 2025</footer>
      </main>
    </div>
  );
};

export default Settings;
