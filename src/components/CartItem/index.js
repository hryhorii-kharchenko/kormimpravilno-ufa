import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import ProductInCartCounter from '../ProductInCartCounter';

import './CartItem.module.css';
import CrossIcon from '../../images/inline/cross.svg';

function CartItem({
  product,
  quantity,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
}) {
  return (
    <article styleName="CartItem">
      <button
        type="button"
        onClick={() => cartRemoveWholeItemHandler(product.id)}
        styleName="cross-btn"
      >
        <CrossIcon styleName="cross-img" />
      </button>

      <div styleName="product-wrapper">
        <Img
          fluid={product.imageSmall.imageFile.childImageSharp.fluid}
          styleName="image"
        />
        <div styleName="inner-wrapper">
          <div styleName="heading-wrapper">
            <h3 styleName="heading">{product.product_post.productName}</h3>
          </div>
          <div styleName="second-row-wrapper">
            <p styleName="single-price">
              Цена за ед.:
              <span styleName="single-price-number">
                {`${product.price.slice(1)} руб`}
              </span>
            </p>

            <div styleName="product-counter-wrapper">
              <p styleName="product-counter">Кол-во:</p>
              <ProductInCartCounter
                quantity={quantity}
                addOnClick={() => addToCartBtnHandler(product.id)}
                removeOnClick={() => cartRemoveOneStackHandler(product.id)}
              />
            </div>

            <p styleName="total-price">
              Итого:
              <span styleName="total-price-number">
                {`${parseInt(product.price.slice(1), 10) * quantity} руб`}
              </span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

CartItem.propTypes = {
  product: PropTypes.shape({
    imageSmall: PropTypes.shape({
      imageFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({ fluid: PropTypes.shape() }),
      }),
    }),
    product_post: PropTypes.shape({
      productName: PropTypes.string,
      composition: PropTypes.string,
    }),
    price: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
};

export default CartItem;
