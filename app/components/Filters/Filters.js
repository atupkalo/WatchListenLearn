'use client';

import './Filters.scss';
import Image from 'next/image';

export default function Filters({ lesson }) {
  return (
    <div className="filters">
      {/* Lesson Title */}
      <div className="filters-lesson-title">{lesson.lessonName}</div>

      {/* Lesson Details */}
      <div className="filters-lesson-definitions">
        <div className="filter-lesson-category-wrap">
          <div className="filter-lesson-label">Level:</div>
          <div className="filter-lesson-value">{lesson.level}</div>
        </div>

        <div className="filter-lesson-category-wrap">
          <div className="filter-lesson-label">Length:</div>
          <div className="filter-lesson-value">{lesson.duration}</div>
        </div>

        <div className="filter-lesson-category-wrap">
          <div className="filter-lesson-label">Category:</div>
          <div className="filter-lesson-value">{lesson.category}</div>
        </div>

        <div className="filter-lesson-category-wrap">
          <div className="filter-lesson-label">Accent:</div>
          <div className="filter-lesson-value">{lesson.accent}</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="filter-lesson-instraction">
        <Image
          src={"/icons/slideout.svg"}
          alt={"Slideout calling icon"}
          width={16}
          height={14}
        />
        <div className="filter-lesson-instraction-text">LESSON INSTRUCTION</div>
      </div>
    </div>
  );
}
