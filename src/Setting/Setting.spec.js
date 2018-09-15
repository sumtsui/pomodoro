// import React from 'react';
// import {shallow, mount} from 'enzyme';
// import Setting from './Setting';

// const convertTime = (timeInSeconds) => {
//   const milliSec = timeInSeconds * 1000;
//   let hours = Math.floor((milliSec % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
//   let minutes = Math.floor((milliSec % (1000 * 60 * 60) / (1000 * 60)));
//   !(hours < 10) || (hours = `0${hours}`);
//   !(minutes < 10) || (minutes = `0${minutes}`);
//   return [hours, minutes];
// }

// test('convertTime() should return an array of HH and MM from the given seconds', () => {
//   convertTime()
// })