import React from 'react';
import PropTypes from 'prop-types';

import './ChainElem.module.css';

function ChainElem({ heading, text, align, isFirst, isLast }) {
  return (
    <article styleName="ChainElem">
      <div styleName={`elem-wrapper ${align} ${isLast ? 'last' : ''}`}>
        <h3 styleName="heading">{heading}</h3>
        <div styleName="heading-decoration" />

        <p styleName="text">{text}</p>
      </div>

      <div styleName={`decoration-wrapper decoration-${align}`}>
        <div styleName="circle" />
        {isFirst ? <div styleName="white-bg-first" /> : null}
        {isLast ? <div styleName="white-bg-last" /> : null}
      </div>
    </article>
  );
}

ChainElem.defaultProps = {
  isFirst: false,
  isLast: false,
};

ChainElem.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default ChainElem;
