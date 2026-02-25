import React from 'react';

function AdminDashboard() {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-cards">
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
        <div className="card">
          <h3>Satisfaction Rate</h3>
          <p>92%</p>
        </div>
      </div>
      {/* Add charts and analytics here */}
    </div>
  );
}

export default AdminDashboard;
