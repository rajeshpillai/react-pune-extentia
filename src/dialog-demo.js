import React, {useState} from 'react';
import ModalDialog from './components/dialog';

export default function DialogModal() {
  const [show, setToggle] = useState(false);
  
  function toggleModal() {
    setToggle(!show);
  }

  return (
    <div>
      <button onClick={toggleModal}>Show Modal</button>
      <ModalDialog show = {show} onClose={toggleModal}>
        <h2>Modal Dialog Demo</h2>
        <div>Some content goes here.  Probably lorem ipsum.  But let's add
           more useful thing.  This component is built using Hooks :)
        </div>
      </ModalDialog>
    </div>
  );
}