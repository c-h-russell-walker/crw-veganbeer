import React, { Component } from "react";

import Telephone from "./Telephone";

class BrewerContact extends Component {
  render() {
    const brewerInfo = this.props.brewerInfo;
    return (
      <div className={"brewer-contact " + (brewerInfo ? "" : "hidden")}>
        {/* TODO - style this address */}
        <address>
          {this._renderAddress()}
          {/* TODO - make this into its own component? */}
          <span className={brewerInfo.country === "USA" ? "hidden" : ""}>
            {brewerInfo.country}
          </span>
        </address>
        <Telephone phone={brewerInfo.phone} />
      </div>
    );
  }

  _renderAddress() {
    const addr = [
      this.props.brewerInfo.address,
      this.props.brewerInfo.city,
      this.props.brewerInfo.state,
    ];
    // We filter out "falsy" empty strings
    return addr.filter((x) => x).join(", ");
  }
}

export default BrewerContact;
