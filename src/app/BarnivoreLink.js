import React from 'react';

export default ({tag, id}) => {
    return <a target="_blank"
              href={`http://www.barnivore.com/beer/${id}/${tag}`}
              className="barnivore-link">Full Barnivore Info</a>;
};
