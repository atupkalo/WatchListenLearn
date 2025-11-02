'use client';

import "./ExerciseResponse.scss";

export default function ExerciseResponse({ passed }) {
  return (
    <div className="exercise_response_wrap" role="status" aria-live="polite">
      <div className="response_text_wrap">
        {passed ? (
          <div className="response_positive result_pop-up">
            <p>Congratulations! You have mastered this topic. Please move on to the next exercise.</p>
          </div>
        ) : (
          <div className="response_negative result_pop-up">
            <p>Unfortunately, you still need more practice. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
