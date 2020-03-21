import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './CartButton.module.css';
import CartIcon from '../../images/inline/cart.svg';

function CartButton({ cart, openCart }) {
  const cartLength = Object.values(cart).reduce((prev, curr) => prev + curr, 0);
  const cardCounterHtml =
    cartLength > 0 ? <p styleName="cart-counter">{cartLength}</p> : null;

  return (
    <Button
      id="mobile-cart-btn"
      onClick={openCart}
      isCircle
      isAction
      isFilled
      styleName="cart-btn"
    >
      <div styleName="cart-icon-wrapper">
        <CartIcon styleName="cart-img" />
      </div>
      {cardCounterHtml}
    </Button>
  );
}

CartButton.propTypes = {
  cart: PropTypes.shape().isRequired,
  openCart: PropTypes.func.isRequired,
};

export default CartButton;
