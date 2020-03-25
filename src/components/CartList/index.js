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
  promoObj,
  totalPrice,
}) {
  if (
    promoObj.hasOwnProperty('maximum_amount') &&
    promoObj.hasOwnProperty('minimum_amount')
  ) {
    if (
      (totalPrice < promoObj.maximum_amount || promoObj.maximum_amount < 1) &&
      totalPrice >= promoObj.minimum_amount
    ) {
      if (promoObj.hasOwnProperty('type') && isOrder) {
        const promoType = promoObj.type;
        const productIds = promoObj.product_ids;
        const excludeProductIds = promoObj.exclude_product_ids;
        const { amount } = promoObj;

        const cartList = Object.entries(cart).map(([key, value]) => {
          const product = catalog.find(elem => elem.id === key);

          let isPromoApplied = false;
          let promoPrice = parseInt(product.price.slice(1), 10);
          if (!excludeProductIds.includes(product.productId)) {
            if (promoType === 'fixed_product') {
              if (productIds.includes(product.productId)) {
                isPromoApplied = true;
                promoPrice -= amount;
              }
            }

            if (promoType === 'percent') {
              if (productIds.length > 0) {
                if (productIds.includes(product.productId)) {
                  isPromoApplied = true;
                  promoPrice -= (promoPrice * amount) / 100;
                }
              }
            }
          }
          return (
            <CartItem
              product={product}
              quantity={value}
              addToCartBtnHandler={addToCartBtnHandler}
              cartRemoveOneStackHandler={cartRemoveOneStackHandler}
              cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
              key={product.id}
              isOrder={isOrder}
              isPromoApplied={isPromoApplied}
              promoPrice={promoPrice}
            />
          );
        });

        return (
          <section styleName="CartList" className={className}>
            {cartList}
          </section>
        );
      }
    }
  }

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
  promoObj: {},
};

CartList.propTypes = {
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
  isOrder: PropTypes.bool,
  promoObj: PropTypes.shape(),
};

export default CartList;
