import React from 'react';
import PropTypes from 'prop-types';

import './SectionSubheading.module.css';

function SectionSubheading({ text, className }) {
  return (
    <p styleName="SectionSubheading" className={className}>
      {text}
    </p>
  );
}

SectionSubheading.defaultProps = {
  className: '',
};

SectionSubheading.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SectionSubheading;
