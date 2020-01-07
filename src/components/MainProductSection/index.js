import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import ContentWrapper from '../ContentWrapper';
import Button from '../Button';
import ProductInCartCounter from '../ProductInCartCounter';

import './MainProductSection.module.css';
import cartIcon from '../../images/svg/cart.svg';
import fbIcon from '../../images/svg/facebook.svg';
import twitterIcon from '../../images/svg/twitter.svg';
import vkIcon from '../../images/svg/vk.svg';
import pinterestIcon from '../../images/svg/pinterest.svg';

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
  let browserWidth = 1200;
  if (typeof window !== 'undefined') {
    browserWidth = window.innerWidth;
  }

  const heading = (
    <div styleName="heading-wrapper">
      <h1 styleName="heading">{productName}</h1>
      <div styleName="heading-underline" />
    </div>
  );
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
        {browserWidth <= 1000 ? heading : null}
        <div styleName="content-wrapper">
          <div styleName="img-wrapper">
            <Img
              fluid={image.imageFile.childImageSharp.fluid}
              alt={productName}
              styleName="avatar"
            />
          </div>
          <div styleName="text-wrapper">
            {browserWidth > 1000 ? heading : null}
            {composition ? compositionHtml : null}
            {weight ? weightHtml : null}
            <div styleName="line" />
            <div styleName="price-wrapper">
              <p styleName="price">{`${price.slice(1)} руб`}</p>
              <div styleName="cart-modificators-wrapper">
                <ProductInCartCounter
                  quantity={cart[id]}
                  addOnClick={() => addToCartOnClick(id)}
                  removeOnClick={() => removeOneStackFromCartOnClick(id)}
                />
                <Button
                  isAction
                  isTextBlack
                  styleName="cart-btn"
                  onClick={() => addToCartOnClick(id)}
                >
                  <img src={cartIcon} alt="" styleName="cart-btn-img" />
                  <span>В корзину</span>
                </Button>
              </div>
            </div>
            <div styleName="line" />
            {cooking ? cookingHtml : null}
            {nutrition ? nutritionHtml : null}
            {info ? infoHtml : null}
            <div styleName="line line-last" />
            <div styleName="share">
              <p styleName="share-title">Поделиться: </p>
              <div styleName="share-wrapper">
                <Button isCircle isExternal styleName="share-btn">
                  <img src={fbIcon} alt="Facebook" styleName="share-img" />
                </Button>
                <Button isCircle isExternal styleName="share-btn">
                  <img src={twitterIcon} alt="Twitter" styleName="share-img" />
                </Button>
                <Button isCircle isExternal styleName="share-btn">
                  <img src={vkIcon} alt="VK" styleName="share-img" />
                </Button>
                <Button isCircle isExternal styleName="share-btn">
                  <img
                    src={pinterestIcon}
                    alt="Pinterest"
                    styleName="share-img"
                  />
                </Button>
              </div>
            </div>
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
