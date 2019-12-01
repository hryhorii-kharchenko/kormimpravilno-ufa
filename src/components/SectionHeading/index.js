import React from 'react';
import PropTypes from 'prop-types';

function SectionHeading({ text }) {
  return <h2 className="SectionHeading">{text}</h2>;
}

SectionHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionHeading;
