import React from 'react';
import PropTypes from 'prop-types';

import './ProductInCartCounter.module.css';

function ProductInCartCounter({ addOnClick, removeOnClick, cart, id }) {
  const count = cart[id];

  if (!count) {
    return null;
  }

  return (
    <div styleName="ProductInCartCounter">
      <button styleName="remove" type="button" onClick={() => addOnClick(id)}>
        -
      </button>
      <span styleName="counter">{count}</span>
      <button styleName="add" type="button" onClick={() => removeOnClick(id)}>
        +
      </button>
    </div>
  );
}

ProductInCartCounter.propTypes = {
  addOnClick: PropTypes.func.isRequired,
  removeOnClick: PropTypes.func.isRequired,
  cart: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductInCartCounter;
