import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import ContentWrapper from '../ContentWrapper';
import Button from '../Button';
import ProductInCartCounter from '../ProductInCartCounter';

import './MainProductSection.module.css';

function MainProductSection({
  productName,
  productId,
  id,
  composition,
  weight,
  price,
  cooking,
  nutrition,
  image,
  cart,
  addToCartOnClick,
  removeFromCartOnClick,
}) {
  // TODO if (cart contains id) { display ProductInCartCounter }

  return (
    <section className="MainProductSection" id="main">
      <ContentWrapper>
        <div className="img-wrapper">
          <Img
            fluid={image.imageFile.childImageSharp.fluid}
            alt={productName}
          />
        </div>
        <div className="text-wrapper">
          <div className="heading-wrapper">
            <h1 className="heading">{productName}</h1>
            <div className="heading-underline" />
          </div>
          <div className="info">
            <p className="info-title">Состав:</p>
            <p className="info-text">{composition}</p>
          </div>
          <div className="info">
            <p className="info-title">Общий вес:</p>
            <p className="info-text">{weight}</p>
          </div>

          <div className="price-wrapper">
            <p styleName="price">{price}</p>

            <div className="cart-modificators-wrapper">
              <ProductInCartCounter
                addOnClick={addToCartOnClick}
                removeOnClick={removeFromCartOnClick}
                cart={cart}
                itemId={id}
              />

              <Button
                isAction
                isTextBlack
                styleName="cart-btn"
                onClick={() => addToCartOnClick(id)}
              />
            </div>
          </div>

          <div className="info">
            <p className="info-title">Способы приготовления:</p>
            <p className="info-text">{cooking}</p>
          </div>
          <div className="info">
            <p className="info-title">
              Средние значения пищевой и энергетической ценности на 100г
              продукта:
            </p>
            <p className="info-text">{nutrition}</p>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

MainProductSection.propTypes = {
  productName: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  composition: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  cooking: PropTypes.string.isRequired,
  nutrition: PropTypes.string.isRequired,
  image: PropTypes.shape({
    imageFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape(),
      }),
    }),
  }).isRequired,
};

export default MainProductSection;
