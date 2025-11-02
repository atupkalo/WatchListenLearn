'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Filters from '../../components/Filters/Filters';
import './Lessons.scss';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch('/data/lessons.json')
      .then((res) => res.json())
      .then(setLessons);
  }, []);

  return (
    <div className='lessons-wrap'>
      <Filters />
      <ul className="lessons">
        {lessons.map((lesson) => (
          <li className="lesson" key={lesson.id}>
            <Link href={`/pages/lessons/${lesson.id}`}>
              <div className="type-icon">
                <Image
                  src={`/icons/${lesson.type === '1' ? 'audio' : 'video'}.svg`}
                  alt="type"
                  width={32}
                  height={32}
                />
              </div>
              <div className="thumbnail">
              </div>
              <div className="leson-info-wrap">
                <div className="lesson-name">{lesson.name}</div>
                <div className="lesson-duration">{lesson.duration}</div>
                <div className="lesson-size">{lesson.length}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div> 
  );
}
