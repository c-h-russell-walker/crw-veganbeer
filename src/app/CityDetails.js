import React from 'react';

export default ({filteringByCity, city, state}) => {
    return <span
                className={filteringByCity ? '' : 'hidden'}
            >{city}{(state) ? `, ${state}` : '' }</span>
};
