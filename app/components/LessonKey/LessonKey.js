'use client';

import Image from 'next/image';
import './LessonKey.scss';

export default function LessonKey({ lesson, openLines, toggleLine, studyLang }) {
  return (
    <div className="single-video-lesson-right">
      {/* Description */}
      <div className="single-video-lessson-description-wrap">
        <div className="video-lesson-section-titles">Lesson Description</div>
        <div className="single-video-lessson-description">
          <p>{lesson.description?.[studyLang]}</p>
        </div>
      </div>

      {/* Lesson Key */}
      <div className="single-video-lesson-key-wrap">
        <div className="video-lesson-section-titles">Lesson Key</div>
        <ul className="single-video-lesson-key-list">
          {lesson.script?.map((line) => {
            const isOpen = openLines.includes(line.id);
            return (
              <li className="single-video-lesson-key-item" key={line.id}>
                <div className="single-video-lesson-key-line-wrap">
                  <div className="single-video-lesson-key-line">
                    <div className="single-video-lesson-key-line-number">
                      <span>Line:</span> {line.id}
                    </div>
                    <div
                      className="single-video-lesson-key-line-open-close"
                      onClick={() => toggleLine(line.id)}
                    >
                      <Image
                        src={`/icons/${isOpen ? 'minus' : 'plus'}.svg`}
                        alt="Toggle line"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>

                  <div
                    className={`single-video-lesson-key-content-wrap ${
                      isOpen ? 'single-video-lesson-key-content-wrap-opened' : ''
                    }`}
                  >
                    <div className="single-video-lesson-key-content single-video-lesson-script">
                      <span>Script:</span> {line.script}
                    </div>
                    <div className="single-video-lesson-key-content single-video-lesson-translation">
                      <span>Translation:</span> {line.translation?.[studyLang]}
                    </div>
                    {line.takeaway?.[studyLang] && (
                      <div className="single-video-lesson-key-content single-video-lesson-takeaways">
                        <span>Takeaway:</span> {line.takeaway[studyLang]}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
