import React from 'react';
import './StarRating.css';

function StarRating({ value, onChange, max = 5 }) {
  return (
    <div className="star-rating">
      {[...Array(max)].map((_, i) => (
        <span
          key={i}
          className={i < value ? 'filled' : ''}
          onClick={() => onChange(i + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
