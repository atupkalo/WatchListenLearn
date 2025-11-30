'use client';

import { useEffect, useState } from 'react';
import './SearchBar.scss';

export default function SearchBar({ onApply }) {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  // Load filters.json
  useEffect(() => {
    fetch('/utility/filters.json')
      .then((res) => res.json())
      .then((data) => {
        setFilters(data);

        // Initialize empty state for each filter
        const initial = {};
        data.forEach((f) => {
          initial[f.id] = f.multi ? [] : '';
        });
        setSelectedFilters(initial);
      })
      .catch((err) => console.error('Failed to load filters:', err));
  }, []);

  const handleChange = (e, filter) => {
    const { value, selectedOptions } = e.target;

    if (filter.multi) {
      const values = Array.from(selectedOptions).map((opt) => opt.value);
      setSelectedFilters((prev) => ({ ...prev, [filter.id]: values }));
    } else {
      setSelectedFilters((prev) => ({ ...prev, [filter.id]: value }));
    }
  };

  const handleApply = () => {
    console.log('Applied Filters:', selectedFilters);
    if (onApply) onApply(selectedFilters); // optional callback for parent
  };

  return (
    <div className="search-bar">
      <ul className="search-list">
        {filters.map((filter) => (
          <li className="search-item" key={filter.id}>
            <label htmlFor={filter.id}>{filter.label}</label>
            <select
              id={filter.id}
              name={filter.id}
              multiple={filter.multi}
              className={filter.multi ? 'multi-select' : ''}
              value={selectedFilters[filter.id]}
              onChange={(e) => handleChange(e, filter)}
            >
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      <button className="apply-button" onClick={handleApply}>
        APPLY
      </button>
    </div>
  );
}
