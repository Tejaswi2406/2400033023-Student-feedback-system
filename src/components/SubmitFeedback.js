import React, { useState } from 'react';
import StarRating from './StarRating';
import CourseDropdown from './CourseDropdown';
import { submitFeedback } from '../api'; 

function SubmitFeedback() {
  const [course, setCourse] = useState('');
  const [overall, setOverall] = useState(0);
  const [content, setContent] = useState(0);
  const [teachingMethodology, setTeachingMethodology] = useState(0);
  const [doubtClarification, setDoubtClarification] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mapping exactly to your Feedback.java entity fields
    const feedbackData = {
      courseName: course,
      overallExperience: overall,
      courseContent: content,
      teachingMethodology: teachingMethodology,
      doubtClarification: doubtClarification,
      additionalComments: comments,
      email: localStorage.getItem("userEmail") || "student@klu.ac.in" 
    };

    if (course && overall > 0) {
      try {
        const response = await submitFeedback(feedbackData);
        if (response.status === 200 || response.status === 201) {
          alert("Feedback saved to database successfully!");
          
          // Clear form fields
          setCourse('');
          setOverall(0);
          setContent(0);
          setTeachingMethodology(0);
          setDoubtClarification(0);
          setComments('');
        }
      } catch (error) {
        console.error("Submission failed:", error);
        alert("Failed to connect to Spring Boot. Check your backend console.");
      }
    } else {
      alert("Please select a course and provide an overall rating.");
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Your Feedback</h2>
      
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
      <textarea 
        value={comments} 
        onChange={(e) => setComments(e.target.value)} 
        placeholder="Enter your feedback here..." 
      />
      
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default SubmitFeedback;