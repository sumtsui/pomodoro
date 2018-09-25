import React, { Component } from 'react';
import Display from '../Display/Display';
import Control from '../Control/Control';
import Setting from '../Setting/Setting';
import Finish from '../Finish/Finish';
import Sound from '../Sound/Sound';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import GithubCorner from 'react-github-corner';
import {Icon} from 'semantic-ui-react';

class App extends Component {
  
  tabTitle = 'Pomodoro';
  workLength = localStorage.getItem('userSetWorkLength') || 25 * 60;
  breakLength = localStorage.getItem('userSetBreakLength') || 5 * 60; 
  section = 1;
  alertSound = false;

  autoStartNext = localStorage.getItem('isAutoNext') === null ? true : getBool(localStorage.getItem('isAutoNext'));
  isMuted = localStorage.getItem('isMuted') === null ? false : getBool(localStorage.getItem('isMuted'));

  state = {
    running: false, // timer is running or not
    remaining: 0, // count down remaning in seconds
    paused: false,  // timer paused or not
    isWorking: true,  // is working section or resting section
  }

  componentDidMount() {
    console.log('isAutoNext', localStorage.getItem('isAutoNext'));
    this.reset();
    Notification.requestPermission();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startCountDown = () => {
    this.intervalId = setInterval(this.tick, 1000);
    this.setState({ running: true });
    this.tabTitle = 'Work';
  }

  getMaxTime = (isWorking) => {
    if (isWorking) {
      return this.workLength;
    } else {
      return this.breakLength;
    }
  }

  endCurrentCountDown = () => {
    this.autoStartNext || clearInterval(this.intervalId);
    const { isWorking } = this.state;
    this.setState({
      running: this.autoStartNext ? true : false,
      isWorking: !isWorking, 
      paused: false,
      remaining: this.getMaxTime(!isWorking)
    });
    this.section = (!this.state.isWorking) ? this.section + 1 : this.section;
    this.tabTitle = (!this.state.isWorking) ? 'Work' : 'Rest';
    document.title = this.tabTitle;
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

  onPause = () => {
    this.setState({paused: !this.state.paused});
  }

  onFinish = () => {
    this.setState({ running: false })
    document.title = 'Pomodoro';
  }

  onSettingSave = (newWorkLength, newBreakLength, isAutoNext, isMuted) => {
    this.workLength = newWorkLength ? newWorkLength * 60 : this.workLength;
    this.breakLength = newBreakLength ? newBreakLength * 60 : this.breakLength;
    this.autoStartNext = isAutoNext;
    this.isMuted = isMuted;
    this.reset();
    localStorage.setItem('userSetWorkLength', this.workLength);
    localStorage.setItem('userSetBreakLength', this.breakLength);
    localStorage.setItem('isMuted', this.isMuted);
    localStorage.setItem('isAutoNext', this.autoStartNext);
  }

  tick = () => {
    const { paused, running, remaining, isWorking } = this.state;
    if (!paused && running) {
      let newTime = remaining - 1;
      this.setState({ remaining: newTime }, () => {
        document.title = this.tabTitle + ' ' + this.formatTime(this.state.remaining);
      });
      if (remaining <= 0) {
        this.endCurrentCountDown();
        this.notify(!isWorking);
      }
    }
  }

  formatTime = (timeInSeconds) => {
    const milliSec = timeInSeconds * 1000;
    // let hours = Math.floor((milliSec % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    let minutes = Math.floor((milliSec % (1000 * 60 * 60) / (1000 * 60)));
    let seconds = Math.floor((milliSec % (1000 * 60) / (1000)));
    // !(hours < 10) || (hours = `0${hours}`);
    !(minutes < 10) || (minutes = `0${minutes}`);
    !(seconds < 10) || (seconds = `0${seconds}`);
    return `${minutes}:${seconds}`;
  }

  notify = (isWorking) => {
    if (!("Notification" in window)) return null;
    if (this.isMuted === false) {
      this.alertSound = true;
      setTimeout(() => this.alertSound = false, 2000);
    }
    document.title = '* ' + this.tabTitle;
    const options = {
      requireInteraction: true,
      body: (isWorking) ? 'Let\'s do this' : 'You deserve it :)'
    };
    const msg = (isWorking) ? 'Start working!' : 'Go relax';
    let notification = new Notification(msg, options);
    notification.onclose = () => document.title = this.tabTitle;
  }

  render() {
    const { remaining, running, paused, isWorking } = this.state;
    return (
      <BrowserRouter>
        <Switch>

          <Route exact path='/' render={() =>
            <div className='container'>

              <GithubCorner
                href="https://github.com/sumtsui/pomodoro"
                bannerColor="#272727"
                octoColor="white"
              />
              <Display
                section={this.section}
                remaining={this.formatTime(remaining)}
                isWorking={isWorking}
              />
              <Control 
                running={running}
                paused={paused}
                onPause={this.onPause}
                endCountDown={this.endCurrentCountDown}
                startCountDown={this.startCountDown}
                onFinish={this.onFinish}
              />
              <Link to='/setting' className='setting-button'>
                <Icon name='setting' size='large' />
              </Link>
              <Sound alert={this.alertSound} />

            </div>
          } />

          <Route path="/setting" render={props => 
            <Setting 
              history={props.history}
              workLength={this.workLength}
              breakLength={this.breakLength}
              onSettingSave={this.onSettingSave}
              autoStartNext={this.autoStartNext}
              isMuted={this.isMuted}
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

function getBool(value) {
  if (value === 'true') return true;
  else if (value === 'false') return false;
  return value
}

export default App;
