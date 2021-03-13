import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [displayError, setDisplayError] = useState(false);

  const changeCountHandler = (val) => {
    if(count + val < 0) {
      setDisplayError(true);
    } else {
      setCount(count + val);
      setDisplayError(false);
    }
  }

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently&nbsp;
        <span data-test="count">
          {count}
        </span>
      </h1>
      {displayError && (
        <h2 data-test="error">Counter can't go below 0</h2>
      )}
      <button
        onClick={() => changeCountHandler(1)}
        data-test="increment-button"
      >Increment counter</button>
      <button
        onClick={() => changeCountHandler(-1)}
        data-test="decrement-button" >
        Decrement counter
        </button>
    </div>
  );
}

export default App;
