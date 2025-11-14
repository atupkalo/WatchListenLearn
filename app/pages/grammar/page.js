'use client';

import { useState } from 'react';
import ExerciseBox from '../../components/ExerciseBox/ExerciseBox';
import BePresentPast from '../../components/Exercises/AllExercises/BePresentPast';
import BePresent from '../../components/Exercises/AllExercises/BePresent';
import BeVsDoAdvance from '../../components/Exercises/AllExercises/BeVsDoAdvance';
import BeVsDoTranslate from '../../components/Exercises/AllExercises/BeVsDoTranslate';
import BeVsDoListenAndSay from '../../components/Exercises/AllExercises/BeVsDoListenAndSay';
import BeVsDoListenAndWrite from '../../components/Exercises/AllExercises/BeVsDoListenAndWrite';
import './Grammar.scss';

export default function GrammarPage() {
  const [activeTab, setActiveTab] = useState('lessons');

  const exercises = [
    { id: 1, BodyComponent: BePresent },
    { id: 2, BodyComponent: BePresentPast },
    { id: 3, BodyComponent: BeVsDoAdvance },
    { id: 4, BodyComponent: BeVsDoTranslate },
    { id: 5, BodyComponent: BeVsDoListenAndSay },
    { id: 6, BodyComponent: BeVsDoListenAndWrite },
  ];

  return (
    <div className="grammar_page">
      <div className="page-desc">
      Complete the set of exercises to secure your knowledge of the beginner’s level. This set consists of 6 exercises, 
each focusing on a different part of mastering a foreign language: understand grammar structures 
through repetition, write to improve spelling, translate from Ukrainian to English to expand your vocabulary, 
listen to authentic recordings, and speak to train your fluency.
      </div>

      <div className="grammar_tabs">
        <button
          className={`grammar-tab-btn ${activeTab === 'lessons' ? 'grammar-tab-active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          LESSONS
        </button>
        <button
          className={`grammar-tab-btn ${activeTab === 'exercises' ? 'grammar-tab-active' : ''}`}
          onClick={() => setActiveTab('exercises')}
        >
         EXERCISES
        </button>
      </div>


      <div className="grammar_tab_content">
        {activeTab === 'lessons' && (
          <div className="grammar_lessons">
            <p>Lessons will be here soon!</p>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="grammar_exercises_grid">
            {exercises.map((exercise) => (
              <ExerciseBox
                key={exercise.id}
                BodyComponent={exercise.BodyComponent}
                responseData={{ passed: false }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
