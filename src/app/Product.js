import React, { Component } from 'react';

import ColoredCircle from './ColoredCircle';

class Product extends Component {
  render() {
    return (
      <div className='product'>
        <ColoredCircle circleColor={this.props.product.red_yellow_green} />
        <span>{this.props.product.product_name}</span>
        <span className="product-status">{this.props.product.status}</span>
      </div>
    );
  }
}

export default Product;