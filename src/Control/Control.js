import React from 'react';
import Proptypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const Control = ({running, onPause, endCountDown, paused, startCountDown, onFinish}) => {
  return (
    running ?
      <div className='control'>
        <Button onClick={onPause}>{paused ? 'Continue' : 'Pause'}</Button>
        <Button onClick={endCountDown}>Skip</Button>
        <Link to='/finish'>
          <Button onClick={onFinish}>
            Finish
          </Button>
        </Link>
      </div >
      :
      <div className='control'>
        <Button
          className='start-button'
          onClick={startCountDown} >
          Start
        </Button>
      </div>
  )
}

Control.prototype = {
  running: Proptypes.string.isRequired,
  paused: Proptypes.string.isRequired,
  onPause: Proptypes.func.isRequired,
  endCountDown: Proptypes.func.isRequired,
  startCountDown: Proptypes.func.isRequired
}

export default Control;