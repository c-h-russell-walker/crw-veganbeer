import React from "react";

import { baseUrl } from "../constants/constants";

export default ({ tag, id }) => {
  return (
    <a
      target="_blank"
      href={`${baseUrl}beer/${id}/${tag}`}
      className="barnivore-link"
    >
      Full Barnivore Info
    </a>
  );
};
