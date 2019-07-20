import React, {useState} from 'react';

export default function UseState1() {
  const [counter, setCounter] = useState(0);  // [counter = 0, setterfn]

  const [user, setUser] = useState({username:"rajesh",password:"secret"});

  function incrementCounter() {
    setCounter(counter + 1);
  }
  function decrementCounter() {
    setCounter(counter - 1);
  }

  function updateUser() {
    setUser({
      ...user,
      username: "ritesh"
    });
  }
  

  return (
    <div>
      <h1>{counter}</h1>
      <h2>{user.username}</h2>
      <h2>{user.password}</h2>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={updateUser}>Set User</button>
      
      <hr/>
    </div>
  )
}