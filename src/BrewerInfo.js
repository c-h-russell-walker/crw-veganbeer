import React, { Component } from 'react';

import Product from './Product';
import BrewerContact from './BrewerContact';

class BrewerInfo extends Component {
  constructor() {
    super();
    this.state = {
      brewerInfo: {},
      products: []
    };
  }

  render() {
    return (
      <div className="brewer-info">
        <div className={(this.state.products.length ? 'hidden' : '')}>
          <p className='loading'>Loading</p>
        </div>
        <BrewerContact brewerInfo={this.state.brewerInfo} />
        {/* Need to style these notes */}
        <span><p>{this.state.brewerInfo.notes}</p></span>
        {this._renderProducts()}
      </div>
    );
  }

  _infoLink() {
    return `http://www.barnivore.com/company/${this.props.brewerId}.json`;
  }

  _renderProducts() {
    return this.state.products.map(function(product) {
        return <Product key={product.id} product={product} />
    });
  }

  componentDidMount() {
    if (!Object.keys(this.state.brewerInfo).length) {
      this._fetchBrewerInfo.apply(this);
    }
  }

  _fetchBrewerInfo() {
    // TODO - leverage localStorage - that way we don't always have to re-fetch
    /* TODO - once setting/getting from localStorage make a reusable abstraction
       to also use with the other main `fetch()` */
    fetch(this._infoLink())
      .then(this._handleFetchBrewerInfo.bind(this), this._handleFetchError);
  }

  _handleFetchBrewerInfo(response) {
    response.json().then(response => {
      this.setState({ brewerInfo: response.company });
      this.setState({ products: response.company.products });
    });
  }

  _handleFetchError(error) {
    console.error(error);
  }
}

export default BrewerInfo;
