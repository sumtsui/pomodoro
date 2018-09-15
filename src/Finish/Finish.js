import React from 'react';

const Finish = ({section, history, reset}) => {
  return (
    <div className='container'>
      <div className='display'>
        <h1>
          Total sections: {section}
        </h1>
        <span className='count-down'>Done!</span>
      </div>
      <div>
        <button
          className='start-button'
          onClick={() => {
            history.goBack();
            reset();
          }}>
          Restart
          </button>
      </div>
    </div>
  )
}

export default Finish;