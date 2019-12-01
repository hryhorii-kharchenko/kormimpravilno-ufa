import React from 'react';
import classes from './ContentWrapper.module.css';

function ContentWrapper({ children }) {
  return <div className={classes.ContentWrapper}>{children}</div>;
}

export default ContentWrapper;
