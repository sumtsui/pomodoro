import React, { Component } from 'react';
import Display from '../Display/Display';
import Control from '../Control/Control';
import Setting from '../Setting/Setting';
import Finish from '../Finish/Finish';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

class App extends Component {
  
  state = {
    workLength: 45 * 60,
    breakLength: 10 * 60,
    running: false,
    remaining: 0, // in seconds
    paused: false,
    section: 1,
    intervalId: null,
    isWorking: true,
  }

  componentDidMount() {
    this.reset();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  startCountDown = () => {
    this.setState({ running: true });
  }

  pauseCountDown = () => {
    this.setState({ paused: !this.state.paused });
  }

  // setState() is async!!
  endCurrentCountDown = () => {
    const {isWorking, section, breakLength, workLength, remaining} = this.state;
    this.setState({
      isWorking: !isWorking, // toggle between working and resting
      paused: false // in case user didn't unpause then press Skip button
    }, () => {
      console.log('remaining', remaining === 0);
      this.notify(this.state.isWorking);
      this.setState({
        section: (this.state.isWorking) ? section + 1 : section,
        remaining: this.state.isWorking ? workLength : breakLength
      })
    });
  }

  reset = () => {
    this.setState({
      intervalId: setInterval(this.tick, 1000),
      remaining: this.state.workLength,
      section: 1,
      isWorking: true
    })
  }

  onFinish = () => {
    this.setState({
      running: false,
      intervalId: clearInterval(this.state.intervalId)
    })
  }

  onSettingSave = (newWorkLength, newBreakLength) => {
    this.setState({
      workLength: newWorkLength,
      breakLength: newBreakLength,
      running: false,
      section: 1,
      isWorking: true
    }, () => this.setState({
      remaining: this.state.workLength
    })
  )}

  tick = () => {
    if (!this.state.paused && this.state.running) {
      this.setState({ remaining: this.state.remaining - 1 });
      if (this.state.remaining === 0) {
        this.endCurrentCountDown();
      }
    }
  }

  formatTime = (timeInSeconds) => {
    const milliSec = timeInSeconds * 1000;
    let hours = Math.floor((milliSec % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    let minutes = Math.floor((milliSec % (1000 * 60 * 60) / (1000 * 60)));
    let seconds = Math.floor((milliSec % (1000 * 60) / (1000)));
    !(hours < 10) || (hours = `0${hours}`);
    !(minutes < 10) || (minutes = `0${minutes}`);
    !(seconds < 10) || (seconds = `0${seconds}`);
    return `${hours}:${minutes}:${seconds}`;
  }

  notify = (isWorking) => {
    const msg = (isWorking) ?
      'Time\'s up! New section begins'
      :
      'Study section end! Have a break';
  // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      new Notification(msg);
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          new Notification(msg);
        }
      });
    }
  }

  render() {
    const { section, remaining, running, paused, isWorking, workLength, breakLength } = this.state;
    return (
      <BrowserRouter>
        <Switch>

          <Route exact path='/' render={() =>
            <div className='container'>
              <Display
                section={section}
                remaining={this.formatTime(remaining)}
                isWorking={isWorking}
              />
              <Control 
                running={running}
                paused={paused}
                pauseCountDown={this.pauseCountDown}
                endCountDown={this.endCurrentCountDown}
                startCountDown={this.startCountDown}
                onFinish={this.onFinish}
              />
              <Link
                to='/setting' 
                className='setting-button'
              >
                Setting
              </Link>
            </div>
          } />

          <Route path="/setting" render={props => 
            <Setting 
              {...props} 
              workLength={workLength}
              breakLength={breakLength}
              onSettingSave={this.onSettingSave}
            />} 
          />

          <Route path="/finish" render={props =>
            <Finish
              {...props}
              section={section}
              reset={this.reset}
            />}
          />

        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
