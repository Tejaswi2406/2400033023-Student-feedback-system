import React from 'react';
import CourseDropdown from './CourseDropdown';

function CourseReports({ selectedCourse, onSelectCourse, reports }) {
  return (
    <div className="course-reports">
      <h2>Course Reports</h2>
      <label>Select Course</label>
      <CourseDropdown value={selectedCourse} onChange={onSelectCourse} />
      {selectedCourse && reports ? (
        <div className="report-details">
          <h3>Report for {selectedCourse}</h3>
          <p>Average Overall: {reports.overall.toFixed(1)}★</p>
          <p>Average Content: {reports.content.toFixed(1)}★</p>
          <p>Average Teaching Methodology: {reports.teachingMethodology.toFixed(1)}★</p>
          <p>Average Doubt Clarification: {reports.doubtClarification.toFixed(1)}★</p>
          {/* Add more analytics as needed */}
        </div>
      ) : (
        <p>Select a course to view report.</p>
      )}
    </div>
  );
}

export default CourseReports;
