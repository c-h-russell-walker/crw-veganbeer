import React from "react";
import TestUtils from "react-dom/test-utils";

import Telephone from "../app/Telephone";

describe("Telephone", () => {
  const phoneString = "617-555-1212";

  const component = TestUtils.renderIntoDocument(
    <Telephone phone={phoneString} />
  );

  it("should have a prop with the phone number", () => {
    expect(component.props).toMatchObject({ phone: phoneString });
  });

  it("should have a method to strip non-numeric", () => {
    expect(component._stripNonNumeric()).toBe("6175551212");
  });

  it("should have a method to render tel attribute", () => {
    expect(component._renderPhoneHref()).toBe("tel:6175551212");
  });
});
