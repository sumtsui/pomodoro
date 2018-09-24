import React, { Component } from 'react';
import Popup from '../Popup/Popup';
import {Button, Icon, Checkbox, Select} from 'semantic-ui-react';

class Setting extends Component {
  
  state = {
    saveButtonClicked: false,
    newWorkLength: 0,
    newBreakLength: 0,
    isAutoNext: this.props.autoStartNext,
    isMuted: this.props.isMuted
  }

  onSaveClicked = e => {
    e.target.setAttribute('disabled', true);
    this.setState({ saveButtonClicked: true });
  }

  onCancelClicked = () => {
    this.setState({saveButtonClicked: false});
  }

  onConfirmClicked = () => {
    const {newWorkLength, newBreakLength, isAutoNext, isMuted} = this.state;
    this.props.history.goBack();
    this.props.onSettingSave(newWorkLength, newBreakLength, isAutoNext, isMuted);
  }

  render() {

    const { history } = this.props;
    const { saveButtonClicked } = this.state;

    const minutes = [];
    for (let i = 1; i <= 60; i++) {
      minutes.push({key: i, value: i, text: i + ' min'})
    }

    return (
      <div className='container setting-page'>

        <a 
          className='back-button'
          onClick={() => history.goBack()}>
          <Icon name='arrow left' size='large' />
        </a>

        <h1>Setting</h1>

        <Select 
          className='setting-item'
          placeholder='Select work length' 
          options={minutes} 
          onChange={(e, {value}) => this.setState({newWorkLength: value})
          } />

        <Select 
          className='setting-item'
          placeholder='Select break length' 
          options={minutes} 
          onChange={(e, {value}) => this.setState({newBreakLength: value})} />

        <div className='toggle-button-group'>
          <Checkbox 
            className='setting-item' 
            label={{children: 'Auto start next countdown'}} 
            slider
            checked={this.state.isAutoNext}
            onChange={(e, {checked}) => this.setState({isAutoNext: checked})} />

          <Checkbox 
            className='setting-item' 
            label={{children: 'Mute alert sound'}} 
            slider
            checked={this.state.isMuted}
            onChange={(e, {checked}) => this.setState({isMuted: checked})} />
        </div>

        {saveButtonClicked ?
          <Popup
            onCancelClicked={this.onCancelClicked}
            onConfirmClicked={this.onConfirmClicked}
          />
          :
          <Button className='save' onClick={this.onSaveClicked}>
            Save
          </Button>
        }
        
      </div>
    )
  }
}

export default Setting;