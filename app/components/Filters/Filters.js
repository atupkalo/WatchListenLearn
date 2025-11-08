'use client';

import './Filters.scss';

export default function Filters({ children }) {
  return (
    <div className="filters">
      <div className="filters-title">Filters</div>
      <div className="filters-desc">Comming soon</div>
      {children}
    </div>

  );
}