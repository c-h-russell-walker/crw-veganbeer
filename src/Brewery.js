import React, { Component } from 'react';

class Brewery extends Component {
  render() {
    const brewery = this.props.brewer;
    return (
      <div className="brewery">
        <span className={'circle ' + brewery.red_yellow_green.toLowerCase()}></span>
        {/* TODO - Deal with url parsing the value in href */}
        <span><a target="_blank" href={brewery.url}>{brewery.company_name}</a></span>
        -
        <span>{brewery.status}</span>
        {/* TODO - Deal with this JSON data - maybe a modal?? */}
        <span><a target="_blank" className='more-info' href={this.infoLink()}>More Info</a></span>
      </div>
    );
  }

  infoLink() {
    return `http://www.barnivore.com/company/${this.props.brewer.id}.json`;
  }
}

export default Brewery;
