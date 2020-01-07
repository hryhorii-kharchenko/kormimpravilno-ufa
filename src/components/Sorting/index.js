import React from 'react';
import PropTypes from 'prop-types';

import './Sorting.module.css';
import arrowDownSvg from '../../images/icons/arrow-down.svg';

function Sorting({ currentSort, possibleSort, onSortChange, className }) {
  const sortName = possibleSort.find(elem => elem.value === currentSort);
  const options = possibleSort.map(option => (
    <button
      type="button"
      onClick={() => onSortChange(option.value)}
      styleName="option"
      key={option.value}
    >
      {option.label}
    </button>
  ));

  return (
    <div styleName="Sorting" className={className}>
      <div styleName="dropdown">
        <span styleName="text">Сортировать:</span>
        <div styleName="dropbtn">
          <p styleName="current">{sortName.label}</p>
          <img src={arrowDownSvg} alt="" styleName="arrow" />
        </div>
        <div styleName="options">
          <div styleName="options-inner-wrapper">{options}</div>
        </div>
      </div>
    </div>
  );
}

Sorting.defaultProps = {
  className: '',
};

Sorting.propTypes = {
  currentSort: PropTypes.number.isRequired,
  possibleSort: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSortChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Sorting;
