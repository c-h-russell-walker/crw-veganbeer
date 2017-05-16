import React, { Component } from 'react';

import ColoredCircle from './ColoredCircle';

class Product extends Component {
  render() {
    return (
      <div className='product'>
        <ColoredCircle circleColor={this.props.product.red_yellow_green} />
        <span id="product-name">{this.props.product.product_name}</span>
        <span id="product-status" className="status product-status">{this.props.product.status}</span>
      </div>
    );
  }
}

export default Product;