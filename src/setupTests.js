// // Basic setup.
// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
//
// Enzyme.configure({adapter: new Adapter()});

// Setup with localStorageMock.
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Makes mock localStorage accessible for all tests.
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;

Enzyme.configure({adapter: new Adapter()});