'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import './Lesson.scss';

export default function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState(null);

  const [isScriptOpen, setIsScriptOpen] = useState(false);
  const [isKeyOpen, setIsKeyOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        const res = await fetch(`/video/v_lesson_${id}.json`);
        if (!res.ok) throw new Error(`Lesson file v_lesson_${id}.json not found`);

        const data = await res.json();
        const lessonData = Array.isArray(data) ? data[0] : data;
        setLesson(lessonData);
      } catch (err) {
        console.error('Failed to load lesson:', err);
        setError('Lesson not found or failed to load.');
      }
    };

    fetchLesson();
  }, [id]);

  if (error) return <div className="single-video-lesson-error">{error}</div>;
  if (!lesson) return <div className="single-video-lesson-loading">Loading lesson...</div>;

  return (
    <div className="single-video-lesson-single">
      <div className="single-video-lesson-left">
        <div className="single-video-lesson-header">
          <div className="single-video-lesson-title">{lesson['lesson name']}</div>
          <p className="single-video-lesson-level">
            <strong>Level:</strong> {lesson.level}
          </p>
          <p className="single-video-lesson-duration">
            <strong>Duration:</strong> {lesson.duration}
          </p>
        </div>

        <div className="single-video-lesson-video">
          <iframe
            className="single-video-lesson-video-frame"
            src={lesson['lesson url']}
            title={lesson['lesson name']}
            width="600px"
            height="420"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>

        <div className="single-video-lesson-interaction">
          <div className="single-video-lesson-interaction-level">
            <div className="single-video-lesson-level-text"><strong>Level: </strong></div>
            <button id="high" className="single-video-lesson-btn">HIGH</button>
            <button id="low" className="single-video-lesson-btn">LOW</button>
          </div>
        </div>
      </div>

      <div className="single-video-lesson-right">
        <div className="single-video-lesson-description">
          <h3>Description</h3>
          <p>{lesson['lesson desc']}</p>
        </div>

        {/* Transcript */}
        <div className="single-video-lesson-transcript-wrap">
          <div
            className={`single-video-lesson-content-close ${isScriptOpen ? 'single-video-lesson-content-close-open' : ''}`}
            onClick={() => setIsScriptOpen(!isScriptOpen)}
          >
            <h3>Transcript</h3>
            <Image
              className="single-video-lesson-icon-chevron"
              src="/icons/shevron.svg"
              alt="chevron icon"
              width={20}
              height={20}
            />
          </div>
          <div className={`single-video-lesson-text-box ${isScriptOpen ? 'opened' : 'closed'}`}>
            <ul>
              {lesson['lesson script'].map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lesson Key */}
        <div className="single-video-lesson-transcript-wrap">
          <div
            className={`single-video-lesson-content-close ${isKeyOpen ? 'single-video-lesson-content-close-open' : ''}`}
            onClick={() => setIsKeyOpen(!isKeyOpen)}
          >
            <h3>Lesson Key</h3>
            <Image
              className="single-video-lesson-icon-chevron"
              src="/icons/shevron.svg"
              alt="chevron icon"
              width={20}
              height={20}
            />
          </div>
          <div className={`single-video-lesson-text-box ${isKeyOpen ? 'opened' : 'closed'}`}>
            {lesson['lesson key'].map((item, i) => (
              <div className="single-video-lesson-key" key={i}>
                <p>
                  <strong>Line {item.line}:</strong> {item.script}
                </p>
                <p>
                  <em>Translation:</em> {item.translation}
                </p>
                {item['script-key']?.length > 0 && (
                  <ul>
                    {item['script-key'].map((k, j) => (
                      <li key={j}>
                        <strong>{k['key-word']}</strong>: {k['key-explanation']}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
