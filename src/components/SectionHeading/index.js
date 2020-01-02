import React from 'react';
import PropTypes from 'prop-types';

import './SectionHeading.module.css';

function SectionHeading({ text, isAlignedLeft, isBig }) {
  return (
    <div
      styleName={`SectionHeading ${isAlignedLeft ? 'aligned-left ' : ''}${
        isBig ? 'big' : ''
      }`}
    >
      <h2 styleName="heading">{text}</h2>
      <div styleName="decoration" />
    </div>
  );
}

SectionHeading.defaultProps = {
  isAlignedLeft: false,
  isBig: false,
};

SectionHeading.propTypes = {
  text: PropTypes.string.isRequired,
  isAlignedLeft: PropTypes.bool,
  isBig: PropTypes.bool,
};

export default SectionHeading;
