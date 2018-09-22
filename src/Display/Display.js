import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ section, remaining, isWorking }) => {
  // console.log('Display Rendering!');
  return (
    <div className={`display ${isWorking ? 'work' : 'rest'}`}>
      <h1>
        {
          isWorking ?
          `Section ${section}`
          :
          'Take a break'
        }
      </h1>
      <span className='count-down'>{remaining}</span>
    </div>
  )
}

Display.prototype = {
  section: PropTypes.string.isRequired,
  isWorking: PropTypes.bool.isRequired,
  remaining: PropTypes.string.isRequired
}

export default Display;