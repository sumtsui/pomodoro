import React from 'react';
import Proptypes from 'prop-types';
import {Link} from 'react-router-dom';

const Control = ({running, pauseCountDown, endCountDown, paused, startCountDown, onFinish}) => {
  return (
    running ?
      <div className='button-running'>
        <button onClick={pauseCountDown}>{paused ? 'Continue' : 'Pause'}</button>
        <button onClick={endCountDown}>Skip</button>
        <Link to='/finish'>
          <button onClick={onFinish}>
            End
          </button>
        </Link>
      </div >
      :
      <div>
        <button
          className='start-button'
          onClick={startCountDown} >
          Start
        </button>
      </div>
  )
}

Control.prototype = {
  running: Proptypes.string.isRequired,
  paused: Proptypes.string.isRequired,
  pauseCountDown: Proptypes.func.isRequired,
  endCountDown: Proptypes.func.isRequired,
  startCountDown: Proptypes.func.isRequired
}

export default Control;