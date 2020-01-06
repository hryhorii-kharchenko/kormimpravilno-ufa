import React from 'react';
import PropTypes from 'prop-types';

import './ProductInCartCounter.module.css';

function ProductInCartCounter({ quantity, addOnClick, removeOnClick }) {
  if (!quantity) return null;

  return (
    <div styleName="ProductInCartCounter">
      <button styleName="remove" type="button" onClick={() => removeOnClick()}>
        -
      </button>
      <span styleName="counter">{quantity}</span>
      <button styleName="add" type="button" onClick={() => addOnClick()}>
        +
      </button>
    </div>
  );
}

ProductInCartCounter.defaultProps = {
  quantity: null,
};

ProductInCartCounter.propTypes = {
  quantity: PropTypes.number,
  addOnClick: PropTypes.func.isRequired,
  removeOnClick: PropTypes.func.isRequired,
};

export default ProductInCartCounter;
