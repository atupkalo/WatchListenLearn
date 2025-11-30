'use client';

import './EasyMood.scss';

export default function EasyMood({
  easyScript,
  handleEasyInputChange,
  handleEasyInputBlur,
}) {
  return (
    <div className="video-lesson-script">
      {easyScript.map((lineObj, lineIdx) => (
        <div key={lineObj.id} className="video-lesson-script-line-wrap">
          <div className="video-lesson-script-line-number">
            <span>Line:</span> {lineObj.id}
          </div>

          <div className="video-lesson-script-line">
            {lineObj.line.map((item, wordIdx) => {
              if (item.type === 'text') {
                return (
                  <span key={wordIdx} className="video-lesson-script-text">
                    {' '}{item.text}{' '}
                  </span>
                );
              }

              if (item.type === 'punctuation') {
                return (
                  <span key={wordIdx} className="video-lesson-script-punctuation">
                    {item.mark}
                  </span>
                );
              }

              if (item.type === 'input') {
                return (
                  <input
                    key={wordIdx}
                    className={`video-lesson-input-easy ${
                      item.correct ? 'video-lesson-correct-answer' : ''
                    }`}
                    style={{ width: `${item.answer.length * 14}px` }}
                    type="text"
                    value={item.value}
                    onChange={(e) =>
                      handleEasyInputChange(lineIdx, wordIdx, e.target.value)
                    }
                    onBlur={() => handleEasyInputBlur(lineIdx, wordIdx)}
                  />
                );
              }

              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}



