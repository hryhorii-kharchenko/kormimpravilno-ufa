import React from 'react';
import PropTypes from 'prop-types';

import './SectionHeading.module.css';

function SectionHeading({ text, isAlignedLeft }) {
  return (
    <div styleName={`SectionHeading ${isAlignedLeft ? 'aligned-left' : ''}`}>
      <h2 styleName="heading">{text}</h2>
      <div styleName="decoration" />
    </div>
  );
}

SectionHeading.defaultProps = {
  isAlignedLeft: false,
};

SectionHeading.propTypes = {
  text: PropTypes.string.isRequired,
  isAlignedLeft: PropTypes.bool,
};

export default SectionHeading;
