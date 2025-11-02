'use client';

import './Filters.scss';

export default function Filters({ children }) {
  return (
    <div className="filters">
      {children}
    </div>
  );
}