'use client';

import './ExersiceBox.scss';
import { useState } from 'react';
import ExerciseHeader from '../ExerciseHeader/ExerciseHeader';
import ExerciseResponse from '../ExerciseResponse/ExerciseResponse';

const TOTAL_QUESTIONS = 20;

export default function ExerciseBox({ BodyComponent }) {
  const [headerData, setHeaderData] = useState({
    lessonNumber: '',
    lessonName: '',
    level: '',
    description: '',
  });

  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState('');
  const [resetKey, setResetKey] = useState(0); // force re-render

  const passed = percentage >= 95 && totalCount === TOTAL_QUESTIONS;

  const handleAnswer = (userAnswer, expectedAnswer) => {
    if (!expectedAnswer) return;

    const cleanedUserAnswer = userAnswer.trim().toLowerCase();
    const cleanedExpectedAnswer = expectedAnswer.trim().toLowerCase();
    const isCorrect = cleanedUserAnswer === cleanedExpectedAnswer;

    setCorrectCount((prev) => (isCorrect ? prev + 1 : prev));
    setTotalCount((prev) => prev + 1);
    setLastCorrectAnswer(isCorrect ? '' : expectedAnswer);

    const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;
    const newTotalCount = totalCount + 1;
    const newPercentage = (newCorrectCount / newTotalCount) * 100;
    setPercentage(Math.round(newPercentage));
  };

  const handleReset = () => {
    setCorrectCount(0);
    setTotalCount(0);
    setPercentage(0);
    setLastCorrectAnswer('');
    setResetKey((prev) => prev + 1);
  };

  return (
    <div className="exercise-box">
      <header className="exercise-box-header">
        <ExerciseHeader {...headerData} />
      </header>

      <main className="exercise-box-main">
        <BodyComponent
          key={resetKey}
          onHeaderDataReady={setHeaderData}
          onAnswer={handleAnswer}
        />

        {lastCorrectAnswer && (
          <div className="exercise-correct-answer answer-active">
            Correct answer: <strong>{lastCorrectAnswer}</strong>
          </div>
        )}

        <div className="exercise-percentage-score">
          Score: <span className="exercise-percentage-score-number">{percentage}%</span>
        </div>
      </main>

      <div className="exersice-reset-btn-wrap">
        <button className="exercise-reset-btn" onClick={handleReset}>
          RESET
        </button>
      </div>

      <footer className="exercise-box-footer">
        {totalCount === TOTAL_QUESTIONS && (
          <ExerciseResponse passed={passed} />
        )}
      </footer>
    </div>
  );
}

