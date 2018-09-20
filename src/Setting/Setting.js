import React, { Component } from 'react';
import Popup from '../Popup/Popup';

class Setting extends Component {
  
  state = {
    saveButtonClicked: false,
    newWorkLength: '',
    newBreakLength: ''
  }

  onSaveClicked = e => {
    e.target.setAttribute('disabled', true);
    this.setState({
      saveButtonClicked: true,
      newWorkLength: e.target.previousElementSibling.previousElementSibling.childNodes[1].firstElementChild.value * 60,
      newBreakLength: e.target.previousElementSibling.childNodes[1].firstElementChild.value * 60,
    })
  }

  onCancelClicked = () => {
    this.setState({saveButtonClicked: false})
  }

  onConfirmClicked = () => {
    const {newWorkLength, newBreakLength} = this.state;
    this.props.history.goBack();
    this.props.onSettingSave(newWorkLength, newBreakLength);
  }

  render() {
    console.log('Setting Rendering!');
    const {history, workLength, breakLength} = this.props;
    const {saveButtonClicked} = this.state;
    return (
      <div className='container setting-page'>

        <a 
          className='back-button'
          onClick={() => history.goBack()}
        >
          Back
        </a>
        
        <label id='work-length'>
          <h3>Section Length</h3>
          <div>
            <input id='work' type="number" min="1" defaultValue={Math.floor(workLength / 60)}/>
            <span>min</span>
          </div>
        </label>

        <label id='break-length'>
          <h3>Break Length</h3>
          <div>
            <input id='break' type="number" min="1" defaultValue={Math.floor(breakLength / 60)}/>
            <span>min</span>
          </div>
        </label>

        {saveButtonClicked ?
          <Popup
            onCancelClicked={this.onCancelClicked}
            onConfirmClicked={this.onConfirmClicked}
          />
          :
          <button onClick={this.onSaveClicked}>
            Save
          </button>
        }
        
      </div>
    )
  }
}

export default Setting;