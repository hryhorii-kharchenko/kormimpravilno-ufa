import React from 'react';
import PropTypes from 'prop-types';

import './SectionHeading.module.css';

function SectionHeading({ text }) {
  return (
    <div styleName="SectionHeading">
      <h2 styleName="heading">{text}</h2>
      <div styleName="decoration" />
    </div>
  );
}

SectionHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionHeading;
