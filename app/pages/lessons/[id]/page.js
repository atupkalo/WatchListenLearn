'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import './Lesson.scss';


export default function LessonPage() {
 
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) return <div className="lesson-error">{error}</div>;
  if (!lesson) return <div className="lesson-loading">Loading lesson...</div>;

  return (
    <div className="lesson-single">
      <div className="lesson-header">
        <h1>{lesson['lesson name']}</h1>
        <p className="lesson-level">
          <strong>Level:</strong> {lesson.level}
        </p>
        <p className="lesson-duration">
          <strong>Duration:</strong> {lesson.duration}
        </p>
      </div>

      <div className="lesson-video">
        <iframe
          src={lesson['lesson url']}
          title={lesson['lesson name']}
          width="100%"
          height="420"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      <div className="lesson-description">
        <h3>Description</h3>
        <p>{lesson['lesson desc']}</p>
      </div>

      <div className="lesson-script">
        <h3>Transcript</h3>
        <ul>
          {lesson['lesson script'].map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="lesson-keywords">
        <h3>Lesson Key</h3>
        {lesson['lesson key'].map((item, i) => (
          <div className="lesson-key" key={i}>
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
  );
}
