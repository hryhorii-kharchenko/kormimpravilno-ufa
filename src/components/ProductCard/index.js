import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from '../Wrapper';
import Button from '../Button';

function ProductCard({
  imgSrc,
  btnIconSrc,
  heading,
  composition,
  weigth,
  price,
  id,
  onClick,
}) {
  return (
    <article className="ProductCard">
      <img src={imgSrc} alt={heading} className="ProductCard-avatar" />

      <header className="ProductCard-header">
        <h3 className="ProductCard-heading">{heading}</h3>
        <p className="ProductCard-composition">
          <strong>Состав: </strong>
          {composition}
        </p>
        <p className="ProductCard-weight">
          <strong>Общий вес: </strong>
          {weigth}
        </p>
      </header>

      <footer className="ProductCard-footer">
        <Wrapper>
          <p className="ProductCard-price">{price}</p>
          <Button isAction isTextBlack onClick={() => onClick(id)}>
            <img src={btnIconSrc} alt="" className="ProductCard-cart-btn-img" />
            В корзину
          </Button>
        </Wrapper>
      </footer>
    </article>
  );
}

ProductCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  btnIconSrc: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  composition: PropTypes.string.isRequired,
  weigth: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductCard;
