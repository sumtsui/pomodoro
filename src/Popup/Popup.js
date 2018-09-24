import React from 'react';
import {Message, Button} from 'semantic-ui-react'

const Popup = ({onCancelClicked, onConfirmClicked }) => {
  console.log('Popup Rendering!');
  return (
    <Message>
      <p>Saving change will reset the timer. Are you sure?</p>
      <div className='alert-action-buttons'>
        <Button onClick={onConfirmClicked}>Confirm</Button>
        <Button onClick={onCancelClicked}>Cancel</Button>
      </div>
    </Message>
  )
}

export default Popup;