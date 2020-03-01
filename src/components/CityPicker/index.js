import React from 'react';
import PropTypes from 'prop-types';

import './CityPicker.module.css';
import arrowDownSvg from '../../images/icons/arrow-down.svg';

function CityPicker({ links, current, isPickerActive, setIsPickerActive }) {
  const options = links.map(option => (
    <a href={option.value} styleName="option" key={option.value}>
      {option.label}
    </a>
  ));

  return (
    <div
      onBlur={() => {
        setTimeout(() => {
          if (
            document.activeElement.parentElement.id !== 'options-inner-wrapper'
          )
            setIsPickerActive(false);
        }, 1);
      }}
      styleName={`CityPicker${isPickerActive ? ' open' : ''}`}
    >
      <div styleName="dropdown">
        <span styleName="text">Город:</span>
        <button
          type="button"
          onClick={() => {
            return isPickerActive
              ? setIsPickerActive(false)
              : setIsPickerActive(true);
          }}
          styleName="dropbtn"
        >
          <p styleName="current">{current}</p>
          <img src={arrowDownSvg} alt="" styleName="arrow" />
        </button>
        <div styleName="options">
          <div id="options-inner-wrapper" styleName="options-inner-wrapper">
            {options}
          </div>
        </div>
      </div>
    </div>
  );
}

CityPicker.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape).isRequired,
  current: PropTypes.string.isRequired,
  isPickerActive: PropTypes.bool.isRequired,
  setIsPickerActive: PropTypes.func.isRequired,
};

export default CityPicker;
