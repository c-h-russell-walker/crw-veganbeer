import fetchMock from 'fetch-mock';

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
const breweriesResponse = [{"id":2256,"company_name":"10 Barrel Brewing","tag":"10-Barrel-Brewing","address":"62970 18th Stree","city":"Bend","state":"Oregon","postal":"97701","country":"USA","phone":"(541) 585-1007","fax":"(541) 585-1008","email":"","url":"http://www.10barrel.com/","checked_by":"Brad","doubled_by":"","notes":"Company Facebook response (May 2012):\r\n\"Thanks for your inquiry. All of our beer is Vegan....We don't use any gelatin....Cheers!\"\r\n","created_on":"2012-05-14T16:09:35.000-04:00","updated_on":"2012-05-14T16:11:35.000-04:00","status":"Vegan Friendly","red_yellow_green":"Green"}];
fetchMock.get('http://www.barnivore.com/beer.json', breweriesResponse);