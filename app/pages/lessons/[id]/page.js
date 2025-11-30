'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Filters from '../../../components/Filters/Filters';
import LessonVideoBlock from '../../../components/LessonVideoBlock/LessonVideoBlock';
import LessonKey from '../../../components/LessonKey/LessonKey';
import EasyMood from '../../../components/EasyMood/EasyMood';
import HardMood from '../../../components/HardMood/HardMood';

import './Lesson.scss';

export default function LessonPage() {
  const { id } = useParams();

  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState('');
  const [openLines, setOpenLines] = useState([]);

  const [mode, setMode] = useState('EASY');

  const [easyScript, setEasyScript] = useState([]);
  const [hardScript, setHardScript] = useState([]);
  const [hardIndex, setHardIndex] = useState(0);
  const [hardInput, setHardInput] = useState('');
  const [displayedScript, setDisplayedScript] = useState([]);

  const studyLang = 'uk';

  /* ---------------------------------------------------------
     FETCH LESSON + PARSE SCRIPT (with punctuation separation)
  -----------------------------------------------------------*/
  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        const res = await fetch(`/video/v_lesson_${id}.json`);
        if (!res.ok) throw new Error('Lesson not found');

        const data = await res.json();
        setLesson(data);

        /* ------------------------------
           EASY MODE SCRIPT PARSING
           - Extract punctuation
           - Keep case-sensitive words
           - Every 2nd word becomes input
        ------------------------------*/
        const parsedEasy = data.script.map((line) => {
          const words = line.script.split(' ');
          const transformed = [];

          words.forEach((word, index) => {
            // match: "word," → ["word", ","]
            const match = word.match(/^(\w+)([.,!?])?$/);

            const baseWord = match ? match[1] : word;
            const punctuation = match ? match[2] : null;

            if (index % 2 === 1) {
              // Input word
              transformed.push({
                type: 'input',
                answer: baseWord, // case-sensitive
                value: '',
                correct: false,
              });
            } else {
              transformed.push({
                type: 'text',
                text: baseWord,
              });
            }

            if (punctuation) {
              transformed.push({
                type: 'punctuation',
                mark: punctuation,
              });
            }
          });

          return { id: line.id, line: transformed };
        });

        setEasyScript(parsedEasy);

        /* ------------------------------
           HARD MODE: list of all words
        ------------------------------*/
        const hardWords = data.script.flatMap((line) => {
          return line.script.split(' ').map((word) => {
            const match = word.match(/^(\w+)([.,!?])?$/);
            return {
              id: line.id,
              word: match ? match[1] : word,
            };
          });
        });

        setHardScript(hardWords);
        setDisplayedScript([]);
        setHardIndex(0);
      } catch (err) {
        console.error(err);
        setError('Lesson not found or failed to load.');
      }
    };

    fetchLesson();
  }, [id]);

  /* ---------------------------------------------------------
     HANDLE EASY MODE
  -----------------------------------------------------------*/
  const handleEasyInputChange = (lineIdx, wordIdx, value) => {
    const updated = [...easyScript];
    updated[lineIdx].line[wordIdx].value = value;
    setEasyScript(updated);
  };

  const handleEasyInputBlur = (lineIdx, wordIdx) => {
    const updated = [...easyScript];
    const item = updated[lineIdx].line[wordIdx];

    // CASE-SENSITIVE MATCH
    if (item.value.trim() === item.answer.trim()) {
      item.correct = true;
      setError('');
    } else {
      item.correct = false;
      setError('The word you entered is incorrect, please try again');
    }

    setEasyScript(updated);
  };

  /* ---------------------------------------------------------
     HANDLE HARD MODE
  -----------------------------------------------------------*/
  const handleHardEnter = () => {
    const current = hardScript[hardIndex];
    if (!current) return;

    const firstLetterCorrect =
      hardInput.trim() === current.word.charAt(0);

    if (firstLetterCorrect) {
      setDisplayedScript([...displayedScript, current]);
      setHardIndex(hardIndex + 1);
      setHardInput('');
      setError('');
    } else {
      setError('Wrong letter, try again');
    }
  };

  const handleHardHint = () => {
    const current = hardScript[hardIndex];
    if (!current) return;

    setDisplayedScript([...displayedScript, current]);
    setHardIndex(hardIndex + 1);
    setHardInput('');
    setError('');
  };

  /* ---------------------------------------------------------
     TOGGLE KEY LINES
  -----------------------------------------------------------*/
  const toggleLine = (lineId) => {
    setOpenLines((prev) =>
      prev.includes(lineId)
        ? prev.filter((id) => id !== lineId)
        : [...prev, lineId]
    );
  };

  /* ---------------------------------------------------------
     RENDER PAGE
  -----------------------------------------------------------*/
  if (!lesson) return <div className="loading">Loading...</div>;

  return (
    <div className="single-video-lesson">

      {/* FILTERS */}
      <div className="single-video-lesson-details">
        <Filters lesson={lesson} />
      </div>

      <div className="single-video-lesson-content-wrap">
        {/* LEFT SIDE */}
        <div className="single-video-lesson-left">

          <LessonVideoBlock
            lesson={lesson}
            error={error}
            mode={mode}
            setMode={setMode}
          />
          <div className="video-lesson-error-message">
            {error && <span>{error}</span>}
          </div>

          {/* MODES */}
          {mode === 'EASY' && (
            <EasyMood
              easyScript={easyScript}
              handleEasyInputChange={handleEasyInputChange}
              handleEasyInputBlur={handleEasyInputBlur}
            />
          )}

          {mode === 'HARD' && (
            <HardMood
              hardInput={hardInput}
              setHardInput={setHardInput}
              displayedScript={displayedScript}
              hardScript={hardScript}
              hardIndex={hardIndex}
              setHardIndex={setHardIndex}
              setDisplayedScript={setDisplayedScript}
              setError={setError}
            />
          )}
        </div>

        {/* RIGHT SIDE */}
        <LessonKey
          lesson={lesson}
          openLines={openLines}
          toggleLine={toggleLine}
          studyLang={studyLang}
        />
      </div>
    </div>
  );
}

