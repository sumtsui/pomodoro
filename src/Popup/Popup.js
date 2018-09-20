import React from 'react';

const Popup = ({onCancelClicked, onConfirmClicked }) => {
  console.log('Popup Rendering!');
  return (
    <div className='alert'>
      <p>Saving change will reset the timer. Do you want to continue?</p>
      <div className='alert-action-buttons'>
        <button onClick={onConfirmClicked}>Confirm</button>
        <button onClick={onCancelClicked}>Cancel</button>
      </div>
    </div>
  )
}

export default Popup;