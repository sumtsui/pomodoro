import React from 'react';
import Display from './Display';
import {shallow} from 'enzyme';

describe('Display', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Display />)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1)
  })

  it('should display "Taking a break..." if isWorking is false', () => {
    wrapper.setProps({isWorking: false})
    expect(wrapper.find('.display h1').text()).toEqual('Taking a break...');
  })

  it('should show Section Number and Remaining Time if isWorking is true', () => {
    const section = 5;
    const remaining = '00:30:00';
    wrapper.setProps({
      section,
      remaining,
      isWorking: true
    });
    expect(wrapper.find('.display').text()).toEqual('Section ' + section + remaining);
  })
})