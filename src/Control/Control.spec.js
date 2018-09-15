import React from 'react';
import {shallow, mount} from 'enzyme';
import Control from './Control';

describe('Render', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Control/>)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  })

  it('should render "Pause" and "End" buttons if the counter is running', () => {
    wrapper.setProps({running: true});
    expect(wrapper.find('.button-running').text()).toEqual('PauseEnd')
  })

  it('should render "Start" buttons if the counter is running', () => {
    wrapper.setProps({running: false});
    expect(wrapper.find('button').text()).toEqual('Start')
  })

  test('when counter is paused, Pause button should turn to "Continue"', () => {
    wrapper.setProps({
      running: true,
      paused: true
    });
    expect(wrapper.find('.button-running').text()).toEqual('ContinueEnd');
  })
})

describe('Start button', () => {
  test('onClick function is called when the button is clicked', () => {
    const fn = jest.fn();
    const component = shallow(
      <Control
        startCountDown={fn}
      />
    )
    component.find('.start-button').simulate('click');
    expect(fn.mock.calls.length).toBe(1);
  })

})
