import React from 'react';
import {Message, Button} from 'semantic-ui-react'

const Finish = ({section, history, reset}) => {
  return (
    <div className='container'>
      <div className='display'>
        <h1>
          Total sections: {section}
        </h1>
        <span className='count-down'>Done!</span>
      </div>
      <div className='control'>
        <Button
          className='start-button'
          onClick={() => {
            history.goBack();
            reset();
          }}>
          Restart
          </Button>
      </div>
    </div>
  )
}

export default Finish;