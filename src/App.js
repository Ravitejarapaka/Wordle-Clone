import React, { useState } from 'react';
import Game from './components/Game';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      <Game />
    </div>
  );
};

export default App;
