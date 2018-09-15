// Create React App runs the setupTests.js file before each test, so it will execute and properly configure Enzyme.

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});