import React from 'react';

function AllFeedback({ feedbacks }) {
  return (
    <div className="all-feedback">
      <h2>All Feedback Submissions</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Student</th>
              <th>Overall</th>
              <th>Content</th>
              <th>Instructor</th>
              <th>Facilities</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb, idx) => (
              <tr key={idx}>
                <td>{fb.course}</td>
                <td>{fb.student || 'Anonymous'}</td>
                <td>{fb.overall}★</td>
                <td>{fb.content}★</td>
                <td>{fb.instructor}★</td>
                <td>{fb.facilities}★</td>
                <td>{fb.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllFeedback;
