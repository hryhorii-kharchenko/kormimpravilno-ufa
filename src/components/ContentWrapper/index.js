import React from 'react';
import PropTypes from 'prop-types';

import classes from './ContentWrapper.module.css';

function ContentWrapper({ children }) {
  return <div className={classes.ContentWrapper}>{children}</div>;
}

ContentWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default ContentWrapper;
