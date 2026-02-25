import React from 'react';
import './FeedbackList.css';

function FeedbackList({ feedbacks }) {
  return (
    <div className="feedback-list">
      <h2>Feedback Received</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <ul>
          {feedbacks.map((item, idx) => (
            <li key={idx}>
              <strong>{item.name}:</strong> {item.feedback}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackList;
