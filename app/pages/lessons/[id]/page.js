'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import './Lesson.scss';

export default function Lesson() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch('/data/lessons.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((l) => l.id === id);
        setLesson(found || null);
      });
  }, [id]);

  if (!lesson) return <p>Loading...</p>;

  return (
    <div className="lesson-single">
      <div className="single-lesson-desc"><p>{lesson.description}</p></div>
      <div className="single-lesson-audio">
        <div className="single-audio-name">{lesson.name}</div>
        <audio controls>
          <source src={lesson.path} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="single-lesson-output">
        <div className="single-lesson-input">
          <input type="text" className="single-lesson-type-in" />
        </div>
        <div className="single-lesson-text-output">{lesson.text}</div>
      </div>
      <div className="single-lesson-key">{lesson.key}</div>
    </div>
  );
}
