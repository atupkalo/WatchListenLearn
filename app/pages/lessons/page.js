'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Filters from '../../components/Filters/Filters';
import './Lessons.scss';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const files = ['v_lesson_1.json', 'v_lesson_2.json']; // Replace or extend if needed
        const results = await Promise.all(
          files.map((file) =>
            fetch(`/video/${file}`)
              .then((res) => res.ok ? res.json() : null)
              .catch((err) => {
                console.error(`Error fetching ${file}:`, err);
                return null;
              })
          )
        );

        const validLessons = results
          .filter(Boolean)
          .flat(); // Flatten if individual files return arrays
        setLessons(validLessons);
      } catch (error) {
        console.error('Failed to load lessons:', error);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div>
      <Filters />
      <div className="single-lesson-wrap">
        <ul className="single-lessons-list">
          {lessons.map((lesson, index) => (
            <li className="single-lesson" key={lesson["lesson id"] || index}>
              <Link href={`/pages/lessons/${lesson["lesson id"]}`}>
              {console.log('Lesson ID:', lesson["lesson id"])}
                <div className="single-lesson-thumbnail">
                  {lesson["lesson thumbnail"] ? (
                    <Image
                      src={lesson["lesson thumbnail"]}
                      alt={lesson["lesson name"]}
                      width={240}
                      height={140}
                    />
                  ) : (
                    <div className="thumbnail-placeholder">No Image</div>
                  )}
                </div>
                <div className="single-lesson-info-wrap">
                  <div className="single-lesson-name">{lesson["lesson name"]}</div>
                  <div className="single-lesson-duration">
                    <span>Duration: </span>{lesson.duration}
                  </div>
                  <div className="single-lesson-level">
                    <span>Level: </span>{lesson.level}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
