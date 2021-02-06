import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import Button from "../app/Button";

describe("Button", () => {
  const displayText = "Woah, click this.";
  const callback = jest.genMockFunction();
  let disabled = true;

  const component = TestUtils.renderIntoDocument(
    <Button displayText={displayText} callback={callback} disabled={disabled} />
  );

  const domComponent = ReactDOM.findDOMNode(component);

  it("should have a prop with display text that becomes innerHTML", () => {
    expect(component.props).toMatchObject({ displayText: displayText });
    expect(domComponent.textContent).toEqual(displayText);
  });

  it("should not call callback on click when disabled", () => {
    TestUtils.Simulate.click(domComponent);
    expect(component.props.callback).not.toHaveBeenCalled();
  });

  it("should call callback on click when disabled is false", () => {
    const enabledComponent = TestUtils.renderIntoDocument(
      <Button displayText={displayText} callback={callback} disabled={false} />
    );

    const enabledDomComponent = ReactDOM.findDOMNode(enabledComponent);

    TestUtils.Simulate.click(enabledDomComponent);
    expect(enabledComponent.props.callback).toHaveBeenCalled();
  });
});
