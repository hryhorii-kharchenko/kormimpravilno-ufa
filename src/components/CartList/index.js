import React from 'react';
import PropTypes from 'prop-types';

import CartItem from '../CartItem';

import './CartList.module.css';

function CartList({
  cart,
  catalog,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
  className,
  isOrder,
}) {
  const cartList = Object.entries(cart).map(([key, value]) => {
    const product = catalog.find(elem => elem.id === key);
    return (
      <CartItem
        product={product}
        quantity={value}
        addToCartBtnHandler={addToCartBtnHandler}
        cartRemoveOneStackHandler={cartRemoveOneStackHandler}
        cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
        key={product.id}
        isOrder={isOrder}
      />
    );
  });

  return (
    <section styleName="CartList" className={className}>
      {cartList}
    </section>
  );
}

CartList.defaultProps = {
  className: '',
  isOrder: false,
};

CartList.propTypes = {
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
  isOrder: PropTypes.bool,
};

export default CartList;
