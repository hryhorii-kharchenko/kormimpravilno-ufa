import React from 'react';
import PropTypes from 'prop-types';

function ChainElem({ heading, text }) {
  return (
    <article className="ChainElem">
      <h3 className="ChainElem-heading">{heading}</h3>
      <p className="ChainElem-text">{text}</p>
    </article>
  );
}

ChainElem.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ChainElem;
