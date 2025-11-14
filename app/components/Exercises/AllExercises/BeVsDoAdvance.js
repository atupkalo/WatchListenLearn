'use client';

import '../AllExercises.scss';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

const MAX_QUESTIONS = 20;

export default function BeVsDo({ onHeaderDataReady, onAnswer }) {
  const [lessonData, setLessonData] = useState(null);
  const [order, setOrder] = useState([]);           // shuffled indices
  const [pos, setPos] = useState(0);                // pointer inside order
  const [userInput, setUserInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wasWrong, setWasWrong] = useState(false);  // highlight the input if wrong

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/data/3_be_vs_do_advance.json');
      const json = await res.json();
      const lesson = json[0];

      setLessonData(lesson);

      onHeaderDataReady?.({
        lessonNumber: 1,
        lessonName: lesson['lesson name'],
        level: lesson.level || 'A2',
        description: lesson.lesson_desc || 'Practice when to use be and do',
      });

      // Prepare a shuffled list of indices, capped to 20
      const content = lesson['lesson content'] || [];
      const indices = Array.from({ length: content.length }, (_, i) => i);
      shuffle(indices);
      setOrder(indices.slice(0, Math.min(MAX_QUESTIONS, indices.length)));
    }
    fetchData();
  }, [onHeaderDataReady]);

  const totalAnswered = correctCount + errorCount;

  const currentItem = useMemo(() => {
    if (!lessonData || order.length === 0 || finished) return null;
    return lessonData['lesson content'][order[pos]];
  }, [lessonData, order, pos, finished]);

  const handleSubmit = () => {
    if (!currentItem || finished) return;

    const isCorrect =
      userInput.trim().toLowerCase() === currentItem.key.trim().toLowerCase();

    onAnswer?.(userInput, currentItem.key);

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setWasWrong(false);
    } else {
      setErrorCount((e) => e + 1);
      setWasWrong(true);
    }

    const nextPos = pos + 1;
    const reachedLimit = nextPos >= Math.min(order.length, MAX_QUESTIONS);

    if (reachedLimit) {
      setFinished(true);
    } else {
      setPos(nextPos);
    }

    setUserInput('');
  };

  if (!lessonData || order.length === 0) return <p>Loading...</p>;

  return (
    <div className="be-vs-do exerices-body">
      <div className="exercies-metrix-wrap">
        <div className="metrix-total">
          Total: <span className="metrix-data">{totalAnswered} / {Math.min(order.length, MAX_QUESTIONS)}</span>
        </div>
        <div className="metrix-correct">
          Correct: <span className="metrix-data">{correctCount}</span>
        </div>
        <div className="metrix-wrong">
          Errors: <span className="metrix-data">{errorCount}</span>
        </div>
      </div>

      {!finished && currentItem && (
        <>
          <div className="exercise-item">
            <input
              className={`exercise-input ${wasWrong ? 'is-wrong' : ''}`}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Your answer"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            />
            <div className="exercise-content">{currentItem.instance}</div>
          </div>

          <div className="exercise-next-wrap" role="button" onClick={handleSubmit}>
          <div className="exercise-next">NEXT</div>
            <Image
              src="/icons/arrow-next.svg"
              alt="Icon arrow"
              width={18}
              height={18}
            />
          </div>
        </>
      )}

      {finished && (
        <div className="exercise-finished">
          <p>Round finished!</p>
        </div>
      )}
    </div>
  );
}

/* ---------- helpers ---------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

