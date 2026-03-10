import React, { useState } from 'react';
import StarRating from './StarRating';
import CourseDropdown from './CourseDropdown';

function SubmitFeedback({ onSubmit }) {
  const [course, setCourse] = useState('');
  const [overall, setOverall] = useState(0);
  const [content, setContent] = useState(0);
  const [teachingMethodology, setTeachingMethodology] = useState(0);
  const [doubtClarification, setDoubtClarification] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (course && overall && content && teachingMethodology && doubtClarification) {
      onSubmit({ course, overall, content, teachingMethodology, doubtClarification, comments });
      setCourse('');
      setOverall(0);
      setContent(0);
      setTeachingMethodology(0);
      setDoubtClarification(0);
      setComments('');
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <label>Course</label>
      <CourseDropdown value={course} onChange={setCourse} />
      <label>Overall Experience</label>
      <StarRating value={overall} onChange={setOverall} />
      <label>Course Content</label>
      <StarRating value={content} onChange={setContent} />
      <label>Teaching Methodology</label>
      <StarRating value={teachingMethodology} onChange={setTeachingMethodology} />
      <label>Doubt Clarification</label>
      <StarRating value={doubtClarification} onChange={setDoubtClarification} />
      <label>Additional Comments</label>
      <textarea value={comments} onChange={e => setComments(e.target.value)} placeholder="Enter comments..." />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SubmitFeedback;
