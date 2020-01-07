import React from 'react';
import PropTypes from 'prop-types';

import CartList from '../CartList';
import Button from '../Button';

import './Cart.module.css';
import arrowBackIcon from '../../images/svg/arrow-previous.svg';
import crossIcon from '../../images/svg/cross.svg';

function Cart({
  closeCart,
  cart,
  catalog,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
}) {
  return (
    <div styleName="Cart">
      <h2 styleName="heading">Ваша корзина</h2>
      <div styleName="line" />

      <CartList
        cart={cart}
        catalog={catalog}
        addToCartBtnHandler={addToCartBtnHandler}
        cartRemoveOneStackHandler={cartRemoveOneStackHandler}
        cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
        styleName="cart-list"
      />

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

        <Button isFilled href="#" styleName="order-btn">
          Оформить заказ
        </Button>

        {/* <Button isFilled href="/order" styleName="order-btn">
          Оформить заказ
        </Button> */}
      </footer>

      <button type="button" onClick={closeCart} styleName="cross-btn">
        <img src={crossIcon} alt="Закрыть" styleName="cross-img" />
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
