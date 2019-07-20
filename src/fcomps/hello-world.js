import React from 'react';

export default function HelloWorld(props) {
  const onHandleClick = () => {
    alert("Some important work");
    if (props.onMessage) {
      props.onMessage("Some message from child");
    }

    
  }
  return (
    <>
      <h2>Hello World! {props.message}</h2>
      <button onClick={onHandleClick}>Click me!</button>
    </>
  )
}