import React, { Component } from 'react';

class Brewery extends Component {
  render() {
    const brewery = this.props.brewer;
    return (
      <div className="Brewery">
        {/* TODO - Deal with url parsing the value in href */}
        <span><a target="_blank" href={brewery.url}>{brewery.company_name}</a></span>
        -
        <span className={brewery.red_yellow_green.toLowerCase()}>
            {brewery.status}
        </span>
        {/* TODO - Deal with this JSON data - maybe a modal?? */}
        <span><a target="_blank" href={this.infoLink()}>More Info</a></span>
      </div>
    );
  }

  infoLink() {
    return `http://www.barnivore.com/company/${this.props.brewer.id}.json`;
  }
}

export default Brewery;
