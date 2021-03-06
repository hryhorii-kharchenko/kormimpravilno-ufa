import React from 'react';
import PropTypes from 'prop-types';

import Scrollbar from 'react-scrollbars-custom';

import CartList from '../CartList';
import Button from '../Button';

import './Cart.module.css';
import arrowBackIcon from '../../images/icons/arrow-previous.svg';
import CrossIcon from '../../images/inline/cross.svg';

function Cart({
  closeCart,
  cart,
  catalog,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
}) {
  const isCartEmpty = Object.keys(cart).length < 1;
  const scrollbarStyle = isCartEmpty
    ? { width: '100%', height: '0px' }
    : { width: '100%', height: '300px' };

  return (
    <div styleName="Cart">
      <h2 styleName="heading">Ваша корзина</h2>
      <div styleName="line" />

      <Scrollbar
        style={scrollbarStyle}
        styleName="scrollbar"
        noScrollX
        noDefaultStyles
      >
        <CartList
          cart={cart}
          catalog={catalog}
          addToCartBtnHandler={addToCartBtnHandler}
          cartRemoveOneStackHandler={cartRemoveOneStackHandler}
          cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
          styleName="cart-list"
        />
      </Scrollbar>

      <div styleName="complete-price-wrapper">
        <p styleName="complete-price">
          Cумма заказа:
          <span styleName="complete-price-number">
            {`${Object.entries(cart).reduce(
              (sum, current) =>
                sum +
                parseInt(
                  catalog
                    .find(product => product.id === current[0])
                    .price.slice(1),
                  10
                ) *
                  current[1],
              0
            )} руб`}
          </span>
        </p>
      </div>

      <footer styleName="footer">
        <button type="button" styleName="continue" onClick={closeCart}>
          <img src={arrowBackIcon} alt="" styleName="continue-arrow" />
          <p styleName="continue-text">Продолжить покупки</p>
        </button>

        <Button
          isFilled
          onClick={closeCart}
          href={Object.keys(cart).length > 0 ? '/order' : null}
          styleName="order-btn"
        >
          Оформить заказ
        </Button>
      </footer>

      <button type="button" onClick={closeCart} styleName="cross-btn">
        <CrossIcon styleName="cross-img" />
      </button>
    </div>
  );
}

Cart.propTypes = {
  closeCart: PropTypes.func.isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
};

export default Cart;
