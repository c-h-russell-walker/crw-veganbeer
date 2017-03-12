import fetchMock from 'fetch-mock';

// import { singleBreweryResponse } from './fixtures/singleBreweryResponse';
import { breweriesResponse } from './fixtures/breweriesResponse';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart#Polyfill
function padStartPolyfill(targetLength, padString) {
  // Floor if number or convert non-number to 0
  targetLength = targetLength >> 0;
  padString = String(padString || ' ');
  if (this.length > targetLength) {
    return String(this);
  } else {
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      // Append to original to ensure we are longer than needed
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(this);
  }
};

String.prototype.padStart = padStartPolyfill;

// Mock requests
fetchMock.get('http://www.barnivore.com/beer.json', breweriesResponse);