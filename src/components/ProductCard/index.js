import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import Button from '../Button';

import './ProductCard.module.css';
import cartIcon from '../../images/svg/cart.svg';

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

          <div styleName="separator" />

          <footer styleName="footer">
            <p styleName="price">{price}</p>
          </footer>
        </div>
      </Link>

      <Button
        isAction
        isTextBlack
        styleName="cart-btn"
        onClick={() => onClick(id)}
      >
        <img src={cartIcon} alt="" styleName="cart-btn-img" />
        <span>В корзину</span>
      </Button>
    </article>
  );
}

ProductCard.defaultProps = {
  composition: null,
  weight: null,
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
};

export default ProductCard;
