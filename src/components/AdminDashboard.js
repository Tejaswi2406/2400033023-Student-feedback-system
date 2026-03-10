import React from "react";
import Header from "./Header";

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>

        <div className="cards">
          <div className="card">
            <h3>Total Feedback</h3>
            <p>123</p>
          </div>

          <div className="card">
            <h3>Average Rating</h3>
            <p>4.5</p>
          </div>

          <div className="card">
            <h3>Courses Reviewed</h3>
            <p>9</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;