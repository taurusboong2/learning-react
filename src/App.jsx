import React from 'react';
import './App.css';
import NumberBaseball from './NumberBaseball';
import ResponseCheck from './ResponseCheck';
import WordRelay from './WordRelay';

function App() {
  return (
    <div className="App">
      <WordRelay />
      <hr />
      <NumberBaseball />
      <hr />
      <ResponseCheck />
    </div>
  );
}

export default App;
