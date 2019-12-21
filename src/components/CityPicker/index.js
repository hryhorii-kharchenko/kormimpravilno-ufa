import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './CityPicker.module.css';
import arrowDownSvg from '../../images/svg/arrow-down.svg';

function CityPicker({ options, current }) {
  const links = options.map(option => (
    <Link to={option.value} styleName="link" key={option.value}>
      option.label
    </Link>
  ));

  return (
    <div styleName="dropdown">
      <span>Город:</span>
      <div styleName="dropbtn">
        <p styleName="current">{current}</p>
        <img src={arrowDownSvg} alt="" styleName="arrow" />
      </div>
      <div styleName="options">{links}</div>
    </div>
  );
}

CityPicker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape).isRequired,
  current: PropTypes.string.isRequired,
};

export default CityPicker;
