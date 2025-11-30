// HardMood.jsx
import './HardMood.scss';

export default function HardMood({
  hardInput,
  setHardInput,
  handleHardEnter,
  handleHardHint,
  displayedScript,
}) {
  return (
    <div className="video-lesson-script-hard">
      <div className="video-lesson-script-hard-control">
        <input
          className="video-lesson-input-hard"
          type="text"
          value={hardInput}
          onChange={(e) => setHardInput(e.target.value)}
        />
        <div className="video-lesson-btn-wrap">
          <button className="video-lesson-btn-hard" onClick={handleHardEnter}>
            ENTER
          </button>
          <button className="video-lesson-btn-hint" onClick={handleHardHint}>
            I DON'T KNOW
          </button>
        </div>
      </div>

      <div className="video-lesson-script">
        {displayedScript.map((w, i) => (
          <div key={i} className="video-lesson-script-line-wrap">
            <div className="video-lesson-script-line-number">
              <span>Line:</span> {w.id}
            </div>
            <div className="video-lesson-script-line">{w.word}</div>
          </div>
        ))}
      </div>
    </div>
  );
}