import React from 'react';

function ViewResults({ results }) {
  return (
    <div className="view-results">
      <h2>Aggregated Feedback Results</h2>
      {results.length === 0 ? (
        <p>No feedback data yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Overall</th>
              <th>Content</th>
              <th>Teaching Methodology</th>
              <th>Doubt Clarification</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx}>
                <td>{r.course}</td>
                <td>{r.overall.toFixed(1)}★</td>
                <td>{r.content.toFixed(1)}★</td>
                <td>{r.teachingMethodology.toFixed(1)}★</td>
                <td>{r.doubtClarification.toFixed(1)}★</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewResults;
