import React, { Component } from 'react';

class Sound extends Component {

  render() {
    return (
      this.props.alert ?
      <div>
        <audio src='./audio/tone-3.mp3' controls autoPlay/>
      </div>
      : 
      <div></div>
    )
  }
}

export default Sound;