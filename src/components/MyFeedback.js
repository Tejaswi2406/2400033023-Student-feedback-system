import React from 'react';

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
              <strong>{fb.course}</strong> - Overall: {fb.overall}★<br />
              Content: {fb.content}★, Teaching Methodology: {fb.teachingMethodology}★, Doubt Clarification: {fb.doubtClarification}★<br />
              Comments: {fb.comments}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyFeedback;
