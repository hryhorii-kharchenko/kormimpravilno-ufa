import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Button from '../Button';

import './ProductCard.module.css';
import cartIcon from '../../images/svg/cart.svg';
import { Link } from 'gatsby';

function ProductCard({
  avatar,
  heading,
  composition,
  weight,
  price,
  id,
  slug,
  onClick,
}) {
  return (
    <article styleName="ProductCard">
      <Img fluid={avatar} alt={heading} styleName="avatar" />

      <div styleName="content-wrapper">
        <header styleName="header">
          <h3 styleName="heading">{heading}</h3>
          <p styleName="composition">
            <strong>Состав: </strong>
            {composition}
          </p>
          <p styleName="weight">
            <strong>Общий вес: </strong>
            {weight}
          </p>
        </header>

        <div styleName="separator" />

        <footer styleName="footer">
          <p styleName="price">{price}</p>
          <Button
            isAction
            isTextBlack
            styleName="cart-btn"
            onClick={() => onClick(id)}
          >
            <img src={cartIcon} alt="" styleName="cart-btn-img" />
            <span>В корзину</span>
          </Button>
        </footer>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  avatar: PropTypes.shape().isRequired,
  heading: PropTypes.string.isRequired,
  composition: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductCard;
