import React from 'react';
import PropTypes from 'prop-types';

import ChainElem from '../ChainElem';

import './Chain.module.css';

// TODO add wave bg

function Chain({ elements }) {
  const chain = elements.map((elem, index, { length }) => {
    if (index === 0) {
      return (
        <ChainElem
          heading={elem.heading}
          text={elem.text}
          align={index % 2 === 0 ? 'right' : 'left'}
          key={elem.heading}
          isFirst
        />
      );
    }

    if (length - 1 !== index) {
      return (
        <ChainElem
          heading={elem.heading}
          text={elem.text}
          align={index % 2 === 0 ? 'right' : 'left'}
          key={elem.heading}
        />
      );
    }

    return (
      <ChainElem
        heading={elem.heading}
        text={elem.text}
        align={index % 2 === 0 ? 'right' : 'left'}
        key={elem.heading}
        isLast
      />
    );
  });

  return <div styleName="Chain">{chain}</div>;
}

Chain.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Chain;
