import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import Button from '../Button';

import './ProductCard.module.css';
import CartIcon from '../../images/inline/cart.svg';

function ProductCard({
  avatar,
  heading,
  composition,
  weight,
  price,
  id,
  slug,
  onClick,
  openCart,
  isShop,
  style,
}) {
  const compositionHtml = (
    <p styleName="composition">
      <strong>Состав: </strong>
      {composition}
    </p>
  );
  const weightHtml = (
    <p styleName="weight">
      <strong>Общий вес: </strong>
      {weight}
    </p>
  );

  if (isShop) {
    return (
      <article styleName="ProductCard shop-ProductCard" style={style}>
        <Link to={slug} styleName="link-wrapper">
          <Img fluid={avatar} alt={heading} styleName="avatar" />

          <div styleName="content-wrapper shop-content-wrapper">
            <header styleName="header shop-header">
              <h3 styleName={`heading ${isShop ? ' shop-heading' : ''}`}>
                {heading}
              </h3>
            </header>
          </div>
        </Link>
        <footer styleName="footer shop-footer">
          <div styleName="content-wrapper shop-content-wrapper">
            <p styleName="price shop-price">
              {`${parseInt(price.slice(1), 10)} РУБ`}
            </p>
            <Button
              isAction
              isTextBlack
              styleName="cart-btn shop-cart-btn"
              onClick={() => {
                onClick(id);
                openCart();
              }}
            >
              <CartIcon styleName="cart-btn-img" />
              <span>В корзину</span>
            </Button>
          </div>
        </footer>
        <footer styleName="hover-footer">
          <div styleName="separator" />
          {composition ? compositionHtml : null}
          {weight ? weightHtml : null}
        </footer>
      </article>
    );
  }

  return (
    <article styleName="ProductCard">
      <Link to={slug} styleName="link-wrapper">
        <Img fluid={avatar} alt={heading} styleName="avatar" />

        <div styleName="content-wrapper">
          <header styleName="header">
            <h3 styleName="heading">{heading}</h3>
            {composition ? compositionHtml : null}
            {weight ? weightHtml : null}
          </header>
        </div>
      </Link>
      <footer styleName="footer">
        <div styleName="separator" />

        <div styleName="footer-content-wrapper">
          <p styleName="price">{`${price.slice(1)} руб`}</p>
          <Button
            isAction
            isTextBlack
            styleName="cart-btn"
            onClick={() => {
              onClick(id);
              openCart();
            }}
          >
            <CartIcon styleName="cart-btn-img" />
            <span>В корзину</span>
          </Button>
        </div>
      </footer>
    </article>
  );
}

ProductCard.defaultProps = {
  composition: null,
  weight: null,
  isShop: false,
};

ProductCard.propTypes = {
  avatar: PropTypes.shape().isRequired,
  heading: PropTypes.string.isRequired,
  composition: PropTypes.string,
  weight: PropTypes.string,
  price: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  isShop: PropTypes.bool,
  style: PropTypes.shape().isRequired,
};

export default ProductCard;
