'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Lessons.scss';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function Lessons() {

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await fetch('/utility/lessons_index.json');
      const data = await res.json();
      setLessons(data);
    };
  
    fetchLessons(); // Run the function

  }, []); // only once, on mount
  
  return (
    <div className="single-lesson-wrap">
      <SearchBar />
      <ul className="single-lessons-list">
        {lessons.map((lesson, index) => (
          <li className="single-lesson" key={index}>
            <Link href={`/pages/lessons/${lesson.id}`}>
              <div className="single-lesson-thumbnail">
                <Image
                  src={lesson.thumbnail || '/placeholder.jpg'}
                  alt={lesson.lessonName}
                  width={240}
                  height={130}
                />
                {!lesson.thumbnail && (
                  <div className="thumbnail-placeholder">No Image</div>
                )}
              </div>
              <div className="single-lesson-info-wrap">
                <div className="single-lesson-name">{lesson.lessonName}</div>
                <div className="single-lesson-level">
                  <span className="single-lesson-level-span">Level: </span>{lesson.level}
                </div>
                <div className="single-lesson-level">
                  <span className="single-lesson-level-span">Accent: </span>{lesson.accent}
                </div>
                <div className="single-lesson-duration">
                  <span className="single-lesson-level-span">Duration: </span>{lesson.duration}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
