import React, { Component } from 'react';

import ColoredCircle from './ColoredCircle';

class Product extends Component {
  render() {
    const { red_yellow_green, product_name, status } = this.props.product;
    return (
      <div className='product'>
        <ColoredCircle circleColor={red_yellow_green} />
        <span id="product-name">{product_name}</span>
        <span id="product-status" className="status product-status">{status}</span>
      </div>
    );
  }
}

export default Product;
