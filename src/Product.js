import React, { Component } from 'react';

import VeganCircle from './VeganCircle';

class Product extends Component {
  render() {
    return (
      <div className='product'>
        <VeganCircle circleColor={this.props.product.red_yellow_green} />
        <span>{this.props.product.product_name}</span>
        <span>{this.props.product.status}</span>
      </div>
    );
  }
}

export default Product;