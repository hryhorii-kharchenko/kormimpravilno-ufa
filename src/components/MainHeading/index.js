import React from 'react';
import PropTypes from 'prop-types';

import './MainHeading.module.css';

function MainHeading({ firstLine, secondLine }) {
  return (
    <div styleName="MainHeading">
      <div styleName="decoration" />
      <h1 styleName="title">
        <span styleName="firstLine">{firstLine}</span>
        <strong styleName="secondLine">{secondLine}</strong>
      </h1>
    </div>
  );
}

MainHeading.propTypes = {
  firstLine: PropTypes.string.isRequired,
  secondLine: PropTypes.string.isRequired,
};

export default MainHeading;
