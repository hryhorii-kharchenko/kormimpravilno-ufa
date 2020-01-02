import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import ContentWrapper from '../ContentWrapper';
import Button from '../Button';
import ProductInCartCounter from '../ProductInCartCounter';

import './MainProductSection.module.css';

function MainProductSection({
  productName,
  id,
  composition,
  weight,
  price,
  cooking,
  nutrition,
  info,
  image,
  cart,
  addToCartOnClick,
  removeOneStackFromCartOnClick,
}) {
  const compositionHtml = (
    <div styleName="info">
      <p styleName="info-title">Состав:</p>
      <p styleName="info-text">{composition}</p>
    </div>
  );
  const weightHtml = (
    <div styleName="info">
      <p styleName="info-title">Общий вес:</p>
      <p styleName="info-text">{weight}</p>
    </div>
  );
  const cookingHtml = (
    <div styleName="info">
      <p styleName="info-title">Способы приготовления:</p>
      <p styleName="info-text">{cooking}</p>
    </div>
  );
  const nutritionHtml = (
    <div styleName="info">
      <p styleName="info-title">
        Средние значения пищевой и энергетической ценности на 100г продукта:
      </p>
      <p styleName="info-text">{nutrition}</p>
    </div>
  );
  const infoHtml = (
    <div styleName="info">
      <p styleName="info-title">Информация о продукте:</p>
      <p styleName="info-text">{info}</p>
    </div>
  );

  return (
    <section styleName="MainProductSection" id="main">
      <ContentWrapper>
        <div styleName="img-wrapper">
          <Img
            fluid={image.imageFile.childImageSharp.fluid}
            alt={productName}
            slyleName="avatar"
          />
        </div>
        <div styleName="text-wrapper">
          {composition ? compositionHtml : null}
          {weight ? weightHtml : null}
          <div styleName="line" />

          <div styleName="price-wrapper">
            <p styleName="price">{price}</p>
            <div styleName="cart-modificators-wrapper">
              <ProductInCartCounter
                addOnClick={addToCartOnClick}
                removeOnClick={removeOneStackFromCartOnClick}
                cart={cart}
                id={id}
              />
              <Button
                isAction
                isTextBlack
                styleName="addtocart-btn"
                onClick={() => addToCartOnClick(id)}
              />
            </div>
          </div>

          <div styleName="line" />

          {cooking ? cookingHtml : null}
          {nutrition ? nutritionHtml : null}
          {info ? infoHtml : null}

          <div styleName="line line-last" />

          <div styleName="share">
            <p styleName="share-title">Поделиться: </p>
            <Button isCircle isExternal styleName="share-btn">
              <img src="" alt="Facebook" styleName="share-img" />
            </Button>
            <Button isCircle isExternal styleName="share-btn">
              <img src="" alt="Twitter" styleName="share-img" />
            </Button>
            <Button isCircle isExternal styleName="share-btn">
              <img src="" alt="VK" styleName="share-img" />
            </Button>
            <Button isCircle isExternal styleName="share-btn">
              <img src="" alt="Pinterest" styleName="share-img" />
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

MainProductSection.defaultProps = {
  composition: null,
  weight: null,
  cooking: null,
  nutrition: null,
  info: null,
};

MainProductSection.propTypes = {
  productName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  composition: PropTypes.string,
  weight: PropTypes.string,
  price: PropTypes.string.isRequired,
  cooking: PropTypes.string,
  nutrition: PropTypes.string,
  info: PropTypes.string,
  image: PropTypes.shape({
    imageFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape(),
      }),
    }),
  }).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartOnClick: PropTypes.func.isRequired,
  removeOneStackFromCartOnClick: PropTypes.func.isRequired,
};

export default MainProductSection;
