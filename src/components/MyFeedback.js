import React from 'react';
import './MyFeedback.css';

function MyFeedback({ feedbacks }) {
  return (
    <div className="my-feedback">
      <h2>My Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <ul>
          {feedbacks.map((fb, idx) => (
            <li key={idx}>
              <strong>{fb.course}</strong>
              <div className="rating-row">Overall: {fb.overall}★</div>
              <div className="rating-row">Content: {fb.content}★ | Teaching Methodology: {fb.teachingMethodology}★ | Doubt Clarification: {fb.doubtClarification}★</div>
              <div className="comments">Comments: {fb.comments}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyFeedback;
