import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Wrapper from '../Wrapper';
import Button from '../Button';

import cartIcon from '../../images/svg/cart.svg';

function ProductCard({
  avatar,
  heading,
  composition,
  weight,
  price,
  id,
  onClick,
}) {
  return (
    <article className="ProductCard">
      <Img fluid={avatar} alt={heading} className="ProductCard-avatar" />

      <header className="ProductCard-header">
        <h3 className="ProductCard-heading">{heading}</h3>
        <p className="ProductCard-composition">
          <strong>Состав: </strong>
          {composition}
        </p>
        <p className="ProductCard-weight">
          <strong>Общий вес: </strong>
          {weight}
        </p>
      </header>

      <footer className="ProductCard-footer">
        <Wrapper>
          <p className="ProductCard-price">{price}</p>
          <Button isAction isTextBlack onClick={() => onClick(id)}>
            <img src={cartIcon} alt="" className="ProductCard-cart-btn-img" />
            <span>В корзину</span>
          </Button>
        </Wrapper>
      </footer>
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
  onClick: PropTypes.func.isRequired,
};

export default ProductCard;
