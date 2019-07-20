import React, {useState} from 'react';

export default function UseState1() {
  const [counter, setCounter] = useState(0);  // [counter = 0, setterfn]

  function incrementCounter() {
    setCounter(counter + 1);
  }
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  )
}