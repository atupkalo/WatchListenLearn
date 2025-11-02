'use client';

import './ExerciseHeader.scss';

export default function ExerciseHeader({ lessonNumber, lessonName, level, description }) {
  return (
    <div className="exercise-header">
      <div className="exercie-name-wrap">
        <div className="exercie-name-title">Lesson {lessonNumber}:</div>
        <div className="exercise-name">{lessonName}</div>
      </div>

      <div className="exercie-level">
        Level: <span>{level}</span>
      </div>

      <div className="exercie-desc-wrap">
        <div className="exercie-desc-title">Description:</div>
        <div className="exercise-desc">
          {description}
        </div>
      </div>
    </div>
  );
}

