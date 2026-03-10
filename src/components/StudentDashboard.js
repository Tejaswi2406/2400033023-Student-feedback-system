import React from 'react';
import Header from "./Header";
function StudentDashboard({ onNavigate }) {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card" onClick={() => onNavigate('submit')}>
          <h3>Submit Feedback</h3>
          <p>Share your experience for any course</p>
        </div>
        <div className="card" onClick={() => onNavigate('myfeedback')}>
          <h3>My Feedback</h3>
          <p>View your submitted feedback</p>
        </div>
        <div className="card" onClick={() => onNavigate('results')}>
          <h3>View Results</h3>
          <p>See what other students think</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default StudentDashboard;
