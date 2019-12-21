import React from 'react';
import PropTypes from 'prop-types';

import './ContentWrapper.module.css';

function ContentWrapper({ children }) {
  return <div styleName="ContentWrapper">{children}</div>;
}

ContentWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default ContentWrapper;
