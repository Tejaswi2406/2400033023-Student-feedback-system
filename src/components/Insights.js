import React from 'react';

function Insights({ insights }) {
  return (
    <div className="insights">
      <h2>AI-Powered Insights</h2>
      {insights && insights.length > 0 ? (
        <ul>
          {insights.map((insight, idx) => (
            <li key={idx}>{insight}</li>
          ))}
        </ul>
      ) : (
        <p>No insights available yet.</p>
      )}
    </div>
  );
}

export default Insights;
