import React, {useState, useEffect} from 'react';

export default function Dialog({children, show, onClose}) {
   // gray background
  const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
  }

  const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
      position: "relative"
  };
  
  const footerStyle = {
    position: "absolute",
    bottom: 20
  };

  const [isOpen, setToggle] = useState(show);

  useEffect(()=> {
    setToggle(show);
  },[show]);

  function handleClick(e) {
    setToggle(false);
    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        {children}
       <div style={footerStyle}>
          <button onClick={handleClick}>Close</button>
       </div>
      </div>
    </div>
  )
}