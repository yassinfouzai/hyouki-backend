import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { bind, toKana } from 'wanakana';
import { getChallengeById } from '../challengeStore';

function getTypeIcon(type) {
  switch (type) {
    case 'text': return '📝';
    case 'image': return '🖼️';
    case 'audio': return '🔊';
    case 'video': return '🎬';
    default: return '📝';
  }
}

function IMETextarea({ value, onChange, ...props }) {
  const handleChange = (e) => {
    const kana = toKana(e.target.value, { IMEMode: true });
    onChange(kana);
  }

  return (
    <textarea {...props} value={value} onChange={handleChange}></textarea>
  )
}

export default function Multiline() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const challenge = getChallengeById(id);


  const handleSubmit = () => {
    const normalizedUser = userAnswer.trim().replace(/\s/g, '');
    const normalizedCorrect = challenge.correctAnswer.trim().replace(/\s/g, '');

    console.log(`User answer: ${userAnswer}`);
    console.log(`User answer (normalized): ${normalizedUser}`);
    console.log(`Correct answer: ${normalizedCorrect}`);

    const isCorrect = normalizedUser === normalizedCorrect;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
  };

  const renderChallengeContent = () => {
    switch (challenge.type) {
      case 'text':
        return <div className="complex-challenge-text">{challenge.content}</div>;

      case 'image':
        return (
          <div className="complex-challenge-image">
            {challenge.content ? (
              <img src={challenge.content} alt="Challenge" />
            ) : (
              <div className="challenge-placeholder-large">
                <span className="challenge-icon-large">🖼️</span>
                <span>Image Challenge</span>
              </div>
            )}
          </div>
        );

      case 'audio':
        return (
          <div className="complex-challenge-audio">
            <div className="challenge-placeholder-large">
              <span className="challenge-icon-large">🔊</span>
              <span>Audio Challenge</span>
            </div>
            <audio controls className="challenge-audio-player">
              <source src="#" type="audio/mpeg" />
              Audio not available in demo
            </audio>
          </div>
        );

      case 'video':
        return (
          <div className="complex-challenge-video">
            <div className="challenge-placeholder-large">
              <span className="challenge-icon-large">🎬</span>
              <span>Video Challenge</span>
            </div>
          </div>
        );

      default:
        return <div className="complex-challenge-text">{challenge.content}</div>;
    }
  };

  if (!challenge) {
    return (
      <div className="flex-wrapper">
        <div className="challenge-container">
          <div className="complex-challenge">
            <div className="complex-challenge-content">
              Challenge not found
            </div>
          </div>
          <button className="btn" onClick={() => navigate('/community')}>
            Back to Community
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-wrapper">
      <div className="challenge-container multiline-practice">
        <div className="complex-challenge">
          {renderChallengeContent()}
        </div>

        <div className="answer-section">
          <IMETextarea
            className={`user-guess-multiline ${feedback === 'correct' ? 'answer-correct' : ''} ${feedback === 'incorrect' ? 'answer-incorrect' : ''}`}
            required
            placeholder="ここに答えを"
            value={userAnswer}
            onChange={setUserAnswer}
          />

          {feedback && (
            <div className={`feedback-message ${feedback}`}>
              {feedback === 'correct' ? (
                <>
                  ✅ Correct! Well done!
                  <div className="feedback-answer">Answer: {challenge.correctAnswer}</div>
                </>
              ) : (
                <>
                  ❌ Incorrect. Try again!
                  <div className="feedback-hint">Hint: The answer starts with "{challenge.correctAnswer.charAt(0)}..."</div>
                </>
              )}
            </div>
          )}
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Check Answer
        </button>
      </div>
    </div>
  );
}
