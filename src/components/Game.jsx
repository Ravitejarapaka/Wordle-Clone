import React, { useState } from 'react';
import GuessRow from './GuessRow';

const Game = () => {
  const validWords = ['apple', 'grape', 'peach', 'lemon', 'berry'];

  // Function to pick a random word from the list
  const getRandomWord = () => validWords[Math.floor(Math.random() * validWords.length)];

  // States
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guessedWords, setGuessedWords] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [gameStatus, setGameStatus] = useState('playing');
  const [currentGuess, setCurrentGuess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Feedback function
  const getFeedback = (target, guess) => {
    let feedback = [];
    let targetLetters = target.split('');
    let guessLetters = guess.split('');

    // First pass - Correct letters in correct positions (green)
    for (let i = 0; i < guessLetters.length; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        feedback[i] = 'green';
        targetLetters[i] = null;
      } else {
        feedback[i] = 'gray';
      }
    }

    // Second pass - Correct letters in wrong positions (yellow)
    for (let i = 0; i < guessLetters.length; i++) {
      if (feedback[i] !== 'green' && targetLetters.includes(guessLetters[i])) {
        feedback[i] = 'yellow';
        targetLetters[targetLetters.indexOf(guessLetters[i])] = null;
      }
    }

    return feedback;
  };

  // Handle guess submission
  const handleGuess = () => {
    if (currentGuess.length !== 5) {
      setErrorMessage("Word must be 5 letters.");
      return;
    }

    if (!validWords.includes(currentGuess)) {
      setErrorMessage("Invalid word. Please enter a valid word.");
      return;
    }

    setErrorMessage('');
    const feedback = getFeedback(targetWord, currentGuess);

    setGuessedWords([...guessedWords, { guess: currentGuess, feedback }]);
    setRemainingAttempts(remainingAttempts - 1);

    // Check win/loss status
    if (currentGuess === targetWord) {
      setGameStatus('won');
    } else if (remainingAttempts === 1) {
      setGameStatus('lost');
    }

    setCurrentGuess('');
  };

  // Handle new game button
  const handleNewGame = () => {
    setTargetWord(getRandomWord());
    setGuessedWords([]);
    setRemainingAttempts(6);
    setGameStatus('playing');
    setCurrentGuess('');
    setErrorMessage('');
  };

  return (
    <div className="game">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <div className="guess-grid">
        {guessedWords.map((item, index) => (
          <GuessRow key={index} guess={item.guess} feedback={item.feedback} />
        ))}
      </div>

      <input
        type="text"
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
        maxLength={5}
        disabled={gameStatus !== 'playing'}
        placeholder="Enter your guess"
      />

      <div>
        <button onClick={handleGuess} disabled={remainingAttempts === 0 || gameStatus !== 'playing'} className='submit-btn'>
            Submit Guess
        </button>
      
        <button onClick={handleNewGame} className='new-btn'>New Game</button>
      </div>

      <p>{gameStatus === 'won' ? 'You Win!' : gameStatus === 'lost' ? 'You Lose!' : `Remaining Attempts: ${remainingAttempts}`}</p>
    </div>
  );
};

export default Game;
