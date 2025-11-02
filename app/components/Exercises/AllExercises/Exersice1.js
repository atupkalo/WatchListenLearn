'use client';

import ExerciseResponse from "./ExerciseResponse";
import "./AllExercises.scss";

export default function BeVsDo() {
  return (
    <div className="lesson_wrap">
      <div className="lesson_name">To be vs Do (verbs) / Present</div>
      <div className="lesson_desc">Practice using "be" and "do" in present tense sentences.</div>

      <div className="lesson_exercise">
        <ExerciseResponse nextExercise="/exercise/2" />
      </div>
    </div>
  );
}
