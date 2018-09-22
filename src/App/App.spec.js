import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import Display from '../Display/Display';
import Control from '../Control/Control';
import Sound from '../Sound/Sound';

describe('Timer functionalities', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  test('formatTime() takes time length in minutes and output formated time', () => {
    const time = wrapper.instance().formatTime(360);
    expect(time).toEqual('00:06:00');
    const time2 = wrapper.instance().formatTime(0);
    expect(time2).toEqual('00:00:00');
  })

  test('tick() decrements Remaining state by 1 when it is called', () => {
    wrapper.setState({
      paused: false,
      running: true,
      remaining: 6
    });
    wrapper.instance().tick();
    expect(wrapper.state('remaining')).toEqual(5)
  })

  it('only increments section count if a working section is finished', () => {
    wrapper.setState({isWorking: true})
    wrapper.instance().endCurrentCountDown();
    expect(wrapper.instance().section).toEqual(1);
  })

  it('automatically starts the next break/working section', () => {
    wrapper.instance().startCountDown();
    wrapper.instance().endCurrentCountDown();
    expect(wrapper.state('running')).toBe(true);
    expect(wrapper.instance().intervalId).not.toBe(undefined);
  })
})

describe('Alert', () => {
  test('a Sound component should be rendered', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('Sound').length).toEqual(1);
  })

  it('should be triggered when alert prop is true', () => {
    const wrapper = mount(<Sound alert={true}/>);
    expect(wrapper.find('audio').length).toEqual(1);
  })
})


