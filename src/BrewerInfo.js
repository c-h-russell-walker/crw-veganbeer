import { autobind } from 'core-decorators';

import React, { Component } from 'react';

import Product from './Product';

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
        {/* TODO - DRY this up a bit somehow - also style it */}
        {this.state.brewerInfo.address}
        {this.state.brewerInfo.city}
        {this.state.brewerInfo.state}
        {this.state.brewerInfo.country}
        {this.state.brewerInfo.phone}
        {this.state.brewerInfo.notes}
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
      this._fetchBrewerInfo();
    }
  }

  @autobind
  _fetchBrewerInfo() {
    fetch(this._infoLink())
      .then(this._handleFetchBrewerInfo, this._handleFetchError);
  }

  @autobind
  _handleFetchBrewerInfo(response) {
    response.json().then(response => {
      console.log(response);
      this.setState({ brewerInfo: response.company });
      this.setState({ products: response.company.products });
    });
  }

  _handleFetchError(error) {
    console.error(error);
  }
}

export default BrewerInfo;
