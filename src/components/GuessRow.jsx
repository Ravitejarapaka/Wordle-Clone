import React from 'react';

// Each guessed word with feedback
const GuessRow = ({ guess, feedback }) => {
  return (
    <div className="guess-row">
      {guess.split('').map((letter, idx) => (
        <div key={idx} className={`letter-box ${feedback[idx]}`}>
          {letter}
        </div>
      ))}
    </div>
  );
};

export default GuessRow;
