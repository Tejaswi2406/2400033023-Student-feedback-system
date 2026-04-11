import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import AllFeedback from './AllFeedback';
import './ViewResults.css';

function TeacherDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedCourse] = useState(localStorage.getItem('teacherCourse') || '');
  const teacherEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (selectedCourse) {
      // Fetch feedback for the selected course
      axios.get(`/api/feedback/course/${selectedCourse}`)
        .then(response => {
          setFeedbacks(response.data);
        })
        .catch(err => {
          console.error('Error fetching feedback:', err);
          alert('Failed to fetch feedback for this course.');
        });
    }
  }, [selectedCourse]);

  const calculateStats = () => {
    if (feedbacks.length === 0) return { avg: 0, total: 0, coursesCount: 0 };

    const avgRating = (feedbacks.reduce((sum, fb) => sum + fb.overallExperience, 0) / feedbacks.length).toFixed(1);
    const total = feedbacks.length;
    const coursesCount = new Set(feedbacks.map(fb => fb.courseName)).size;

    return { avg: avgRating, total, coursesCount };
  };

  const stats = calculateStats();

  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-content">
        <h2>Teacher Dashboard</h2>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Logged in as: <strong>{teacherEmail || 'Guest'}</strong>
        </p>

        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          <label style={{ marginRight: '10px' }}>Your Course:</label>
          <strong>{selectedCourse}</strong>
          <button onClick={() => {
            localStorage.removeItem('teacherCourse');
            window.location.href = '/';
          }} style={{ marginLeft: '20px', padding: '5px 10px' }}>Switch Course</button>
        </div>

        {selectedCourse ? (
          <>
            <div className="cards">
              <div className="card">
                <h3>Total Feedback Received</h3>
                <p>{stats.total}</p>
              </div>

              <div className="card">
                <h3>Average Course Rating</h3>
                <p>{stats.avg}★</p>
              </div>

              <div className="card">
                <h3>Course Code</h3>
                <p>{selectedCourse}</p>
              </div>
            </div>

            <h3 style={{ marginTop: '30px' }}>Feedback Details for {selectedCourse}</h3>
            <AllFeedback feedbacks={feedbacks} />
          </>
        ) : (
          <div style={{ padding: '20px', backgroundColor: '#e8f4f8', borderRadius: '5px', textAlign: 'center' }}>
            <p>Loading course data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
