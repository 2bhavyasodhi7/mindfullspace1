
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="32"
          height="32"
        >
          <text x="12" y="16" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" fill="currentColor" textAnchor="middle" dominantBaseline="middle">MS</text>
        </svg>
      </div>
      <span className="text-xl font-bold text-white font-raleway">MindfulSpace</span>
    </Link>
  );
};

export default Logo;
