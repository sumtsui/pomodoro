import React, { Component } from 'react';
import Display from '../Display/Display';
import Control from '../Control/Control';
import Setting from '../Setting/Setting';
import Finish from '../Finish/Finish';
import Sound from '../Sound/Sound';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

class App extends Component {
  
  appTitle = 'Study';
  workLength = 45 * 60;
  breakLength = 10 * 60; 
  section = 1;
  autoStartNext = true;
  muted = false;
  alert = false;

  state = {
    running: false, // timer is running or not
    remaining: 0, // count down remaning in seconds
    paused: false,  // timer paused or not
    isWorking: true,  // is working section or resting section
  }

  componentDidMount() {
    this.reset();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startCountDown = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.tick, 1000);
    this.setState({ running: true });
  }

  pauseCountDown = () => {
    this.setState({ paused: !this.state.paused });
  }

  // setState() is async!!
  endCurrentCountDown = () => {
    this.autoStartNext || clearInterval(this.intervalId);
    const {isWorking} = this.state;
    this.setState({
      running: this.autoStartNext ? true : false,
      isWorking: !isWorking, 
      paused: false, // in case user didn't unpause then press Skip button
    }, () => {
      this.setState({ remaining: this.state.isWorking ? this.workLength : this.breakLength });
      this.section = (this.state.isWorking) ? this.section + 1 : this.section;
      this.notify(this.state.isWorking);
    });
  }

  reset = () => {
    clearInterval(this.intervalId)
    this.section = 1;
    this.setState({
      remaining: this.workLength,
      isWorking: true,
      paused: false,
      running: false
    })
  }

  onFinish = () => {
    this.setState({ running: false })
    clearInterval(this.intervalId)
  }

  onSettingSave = (newWorkLength, newBreakLength) => {
    this.workLength = newWorkLength;
    this.breakLength = newBreakLength;
    this.reset();
  }

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
    this.alert = true;
    setTimeout(() => this.alert = false, 2000);
    let n;
    document.title = '* ' + this.appTitle;
    const options = {
      requireInteraction: true,
      onclick: () => console.log('click')
    };
    const msg = (isWorking) ? 'Let\'s do it' : 'Take a break';
    if (!("Notification" in window)) 
      return console.log("This browser does not support desktop notification");
    if (Notification.permission === "granted") 
      n = new Notification(msg, options);
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") 
          n = new Notification(msg, options);
      });
    }
    if (n) n.onclose = () => document.title = this.appTitle;
  }

  render() {
    const { remaining, running, paused, isWorking } = this.state;
    return (
      <BrowserRouter>
        <Switch>

          <Route exact path='/' render={() =>
            <div className='container'>

              <Display
                section={this.section}
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
              <Link to='/setting' className='setting-button'>
                Setting
              </Link>
              <Sound alert={this.alert} />

            </div>
          } />

          <Route path="/setting" render={props => 
            <Setting 
              history={props.history}
              workLength={this.workLength}
              breakLength={this.breakLength}
              onSettingSave={this.onSettingSave}
            />} 
          />

          <Route path="/finish" render={props =>
            <Finish
              {...props}
              section={this.section}
              reset={this.reset}
            />}
          />

        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
