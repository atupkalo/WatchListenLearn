'use client';

import './LessonVideoBlock.scss';

export default function LessonVideoBlock({ lesson, error, mode, setMode }) {
  return (
    <div className="lesson-video-block">
      {/* Video Player */}
      <div className="lesson-video-wrapper">
        <iframe
          className="lesson-video"
          src={lesson.lessonUrl}
          title={lesson.lessonName}
          width="600"
          height="340"
          allow="autoplay; fullscreen"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>

      {/* Mode Switch Panel */}
      <div className="video-lesson-mode-panel">
        <div className="video-lesson-levels">
          <div className="video-lesson-level-label">Level:</div>
          <div
            className={`video-lesson-level ${mode === 'EASY' ? 'video-lesson-level-active' : ''}`}
            onClick={() => setMode('EASY')}
          >
            EASY
          </div>
          <div
            className={`video-lesson-level ${mode === 'HARD' ? 'video-lesson-level-active' : ''}`}
            onClick={() => setMode('HARD')}
          >
            HARD
          </div>
        </div>
      </div>
    </div>
  );
}

