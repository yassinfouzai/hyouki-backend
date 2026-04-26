import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

// "Single" refers to the fact that this is just a single Hiragana/Katakana/Kanji/Jukugo, and not
// a whole text/image/audio.
// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Single() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef(null);

  // Get practice data from navigation state and shuffle it
  const practiceData = location.state?.practiceData || [];
  const [shuffledData, setShuffledData] = useState(() => shuffleArray(practiceData));

  // If no practice data, show fallback or redirect
  if (practiceData.length === 0) {
    return (
      <div className="flex-wrapper">
        <div className="challenge-container">
          <div className="simple-challenge">
            <div className="simple-challenge-content">
              <p>No practice data available.</p>
            </div>
          </div>
          <button className="btn" onClick={() => navigate('/learn')}>
            Back to Learn
          </button>
        </div>
      </div>
    );
  }

  const currentChallenge = shuffledData[currentIndex];

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
    setFeedback(null);
  };

  const handleSubmit = () => {
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = currentChallenge.reading.trim().toLowerCase();
    
    const isCorrect = normalizedUser === normalizedCorrect;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setIsAnimating(true);
    }
  };

  // Auto-advance after correct answer (loops infinitely)
  useEffect(() => {
    if (feedback === 'correct' && isAnimating) {
      const timer = setTimeout(() => {
        if (currentIndex < shuffledData.length - 1) {
          // Move to next character
          setCurrentIndex(currentIndex + 1);
        } else {
          // Reached end - reshuffle and restart from beginning
          setShuffledData(shuffleArray(practiceData));
          setCurrentIndex(0);
        }
        setUserAnswer('');
        setFeedback(null);
        setIsAnimating(false);
      }, 200); // 800ms delay to show the success animation
      
      return () => clearTimeout(timer);
    }
  }, [feedback, isAnimating, currentIndex, shuffledData.length, practiceData]);

  // Focus input when not animating (after advancing to next character)
  useEffect(() => {
    if (!isAnimating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAnimating, currentIndex]);

  const handleNext = () => {
    if (currentIndex < shuffledData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reached end - reshuffle and restart
      setShuffledData(shuffleArray(practiceData));
      setCurrentIndex(0);
    }
    setUserAnswer('');
    setFeedback(null);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer('');
      setFeedback(null);
    }
  };

  const progress = `${currentIndex + 1} / ${shuffledData.length}`;

  return (
    <div className="flex-wrapper">
      <div className="challenge-container single-practice">
        <div className="practice-header">
          <span className="progress-indicator">{progress}</span>
          <span className="column-indicator">Column: {currentChallenge.column}</span>
        </div>

        <div className="simple-challenge">
          <div className="simple-challenge-content">
            <ruby>{currentChallenge.character}</ruby>
          </div>
        </div>

        <div className="answer-section">
          <input
            ref={inputRef}
            type="text"
            className={`user-guess-single-line ${feedback === 'correct' ? 'answer-correct' : ''} ${feedback === 'incorrect' ? 'answer-incorrect' : ''} ${isAnimating ? 'correct-animation' : ''}`}
            placeholder="ここに読み方を"
            value={userAnswer}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            autoFocus
            disabled={isAnimating}
          />

          {feedback && (
            <div className={`feedback-message ${feedback} ${isAnimating ? 'fade-out' : ''}`}>
              {feedback === 'correct' ? (
                <>
                  Correct! Keep going!
                  <div className="next-hint">Next character coming up...</div>
                </>
              ) : (
                <>
                  Incorrect. Try again!
                  <div className="feedback-hint">Hint: The answer starts with "{currentChallenge.reading.charAt(0)}..."</div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="btns single-btns">
          <button className="btn" onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Check Answer
          </button>
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        </div>

        <button className="btn btn-back" onClick={() => navigate('/learn')}>
          Back to Learn
        </button>
      </div>
    </div>
  );
}