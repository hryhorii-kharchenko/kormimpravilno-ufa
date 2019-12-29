import React from 'react';
import PropTypes from 'prop-types';

import './ProductInCartCounter.module.css';

function ProductInCartCounter({ addOnClick, removeOnClick, cart, itemId }) {
  const count = 
  
  return (
    <div className="ProductInCartCounter">
      <button className="remove" type="button">
        -
      </button>
      <span className="counter">{count}</span>
      <button className="add" type="button">
        +
      </button>
    </div>
  );
}

ProductInCartCounter.propTypes = {
  addOnClick: PropTypes.func.isRequired,
  removeOnClick: PropTypes.func.isRequired,
  itemId: PropTypes.func.isRequired,
};

export default ProductInCartCounter;
