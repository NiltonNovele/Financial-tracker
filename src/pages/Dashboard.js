import React, { useState } from "react";
import "../styles/Dashboard.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  const [messages] = useState([
    "Reminder: Meeting tomorrow at 3 PM",
    "You have a new task to complete!"
  ]);
  const [date, setDate] = useState(new Date());

  const salesGraphData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Sales Overview",
        data: [65, 59, 80, 81, 56],
        fill: true,
        borderColor: "#00C8A0",
        tension: 0.4,
      },
    ],
  };

  const inventoryGraphData = {
    labels: ["A", "B", "C", "D", "E"],
    datasets: [
      {
        label: "Inventory",
        data: [50, 30, 70, 40, 90],
        fill: true,
        borderColor: "#FF6F61",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="to-you-column">
        <h2>To You</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>

      <div className="content">
        <h1>Welcome, Kiana!</h1>
        <p>This is your financial tracking dashboard.</p>

        <div className="dashboard-center">
          <div className="floating-box main-box top-left">
            <h3>Weekly Summary</h3>
            <Line data={salesGraphData} />
          </div>
          <div className="floating-box extra-box top-center">
            <h3>Performance</h3>
            <p>Progress this month.</p>
          </div>
          <div className="floating-box main-box top-right">
            <h3>Key Points</h3>
            <p>Important notes and insights.</p>
          </div>

          <div className="floating-box extra-box middle-left">
            <h3>Notifications</h3>
            <p>Recent updates & alerts.</p>
          </div>
          <div className="calendar-container">
            <h3>Important Dates</h3>
            <Calendar onChange={setDate} value={date} className="calendar" />
          </div>
          <div className="floating-box extra-box middle-right">
            <h3>Tasks</h3>
            <p>Upcoming deadlines.</p>
          </div>

          <div className="floating-box main-box bottom-left">
            <h3>Weekly Objectives</h3>
            <p>Goals & targets.</p>
          </div>
          <div className="floating-box extra-box bottom-center">
            <h3>Productivity</h3>
            <p>Current efficiency stats.</p>
          </div>
          <div className="floating-box main-box bottom-right">
            <h3>Inventory Overview</h3>
            <Line data={inventoryGraphData} />
          </div>
        </div>
      </div>

      <div className="support-chatbox">
        <div className="chat-character">🤖</div>
        <p className="chat-text">Need Help? <br /> Contact Us!</p>
      </div>

      <button className="talk-to-manager-btn">Talk to Manager</button>
    </div>
  );
};

export default Dashboard;
