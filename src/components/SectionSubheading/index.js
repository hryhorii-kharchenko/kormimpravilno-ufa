import React from 'react';
import PropTypes from 'prop-types';

function SectionSubheading({ text }) {
  return <p className="SectionSubheading">{text}</p>;
}

SectionSubheading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionSubheading;
