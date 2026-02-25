import React, { useState } from 'react';
import './FeedbackForm.css';

function FeedbackForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && feedback.trim()) {
      onSubmit({ name, feedback });
      setName('');
      setFeedback('');
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}> 
      <h2>Student Feedback Form</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <label>Feedback:</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default FeedbackForm;
