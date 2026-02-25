import React from 'react';

const courses = [
  { code: 'CS201', name: 'Frontend Development', instructor: 'Prof. Alex Turner' },
  { code: 'CHEM101', name: 'General Chemistry', instructor: 'Dr. Rachel Green' },
  { code: 'BIO301', name: 'Molecular Biology', instructor: 'Prof. Thomas Wright' },
  { code: 'MATH105', name: 'Calculus I', instructor: 'Dr. Emily Carter' },
];

function CourseDropdown({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} required>
      <option value="">Select Course</option>
      {courses.map(course => (
        <option key={course.code} value={course.code}>
          {course.code} - {course.name} ({course.instructor})
        </option>
      ))}
    </select>
  );
}

export default CourseDropdown;
