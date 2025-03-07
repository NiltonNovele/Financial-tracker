import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: "200px", backgroundColor: "#1a1d2e", padding: "20px" }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link></li>
        <li><Link to="/sales" style={{ color: "white", textDecoration: "none" }}>Sales</Link></li>
        <li><Link to="/inventory" style={{ color: "white", textDecoration: "none" }}>Inventory</Link></li>
        <li><Link to="/settings" style={{ color: "white", textDecoration: "none" }}>Settings</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
