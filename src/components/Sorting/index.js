import React from 'react';
import PropTypes from 'prop-types';

import './Sorting.module.css';
import arrowDownSvg from '../../images/icons/arrow-down.svg';

function Sorting({
  text,
  currentSort,
  possibleSort,
  onSortChange,
  isOpen,
  openHandler,
  closeHandler,
  className,
}) {
  const sortName = possibleSort.find(elem => elem.value === currentSort);
  const options = possibleSort.map(option => (
    <button
      type="button"
      onClick={() => {
        onSortChange(option.value);
        closeHandler();
      }}
      styleName="option"
      key={option.value}
    >
      {option.label}
    </button>
  ));

  return (
    <div
      onBlur={() => {
        setTimeout(() => {
          if (
            document.activeElement.parentElement.id !== 'options-inner-wrapper'
          )
            closeHandler();
        }, 1);
      }}
      styleName={`Sorting${isOpen ? ' open' : ''}`}
      className={className}
    >
      <div styleName="dropdown">
        <span styleName="text">{`${text}:`}</span>
        <button
          type="button"
          onClick={() => (isOpen ? closeHandler() : openHandler())}
          styleName="dropbtn"
        >
          <p styleName="current">{sortName.label}</p>
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

Sorting.defaultProps = {
  className: '',
};

Sorting.propTypes = {
  text: PropTypes.string.isRequired,
  currentSort: PropTypes.number.isRequired,
  possibleSort: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSortChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  openHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Sorting;
