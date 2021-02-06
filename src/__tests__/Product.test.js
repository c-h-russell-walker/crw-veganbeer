import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";

import Product from "../app/Product";

describe("Product", () => {
  const product = {
    id: 42,
    red_yellow_green: "Green",
    product_name: "Behemoth",
    status: "Vegan Friendly",
  };

  const component = TestUtils.renderIntoDocument(
    <Product key={product.id} product={product} />
  );

  it("should have product as its props", () => {
    expect(component.props.product).toMatchObject(product);
  });

  const domComponent = ReactDOM.findDOMNode(component);
  const children = domComponent.children;

  it('should have a "#product-name" element', () => {
    const nameEl = children.namedItem("product-name");
    expect(nameEl).toBeTruthy();
    expect(nameEl.textContent).toEqual(product.product_name);
  });

  it('should have a "#product-status" element', () => {
    const statusEl = children.namedItem("product-status");
    expect(statusEl).toBeTruthy();
    expect(statusEl.textContent).toEqual(product.status);
  });
});
