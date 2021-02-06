import React from "react";

export default ({ circleColor }) => {
  return <span className={"circle " + circleColor.toLowerCase()}></span>;
};
