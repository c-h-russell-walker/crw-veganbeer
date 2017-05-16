import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import DateRetrieved from '../app/DateRetrieved';

describe('DateRetrieved', () => {
  const testTimestamp = + new Date('6/26/2017');
  const component = TestUtils.renderIntoDocument(
    <DateRetrieved retrievedTimestamp={testTimestamp} />
  );

  it('should have a prop with the timestamp', () => {
    expect(component.props).toMatchObject({retrievedTimestamp: 1498449600000});
  });

  it('should have working date format functions', () => {
    expect(component.retrievedDate()).toBe('6/26/2017');
    expect(component.formattedDateTime()).toBe('2017-06-26');
  });

  const domComponent = ReactDOM.findDOMNode(component);

  it('should have a <time> element', () => {
    const timeEl = domComponent.children.namedItem('date-retrieved-time');
    expect(timeEl).toBeTruthy();
    expect(timeEl.textContent).toEqual(component.retrievedDate());
    expect(timeEl.dateTime).toEqual(component.formattedDateTime());
  });

});
