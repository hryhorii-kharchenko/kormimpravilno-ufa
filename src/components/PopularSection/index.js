import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import ProductGallery from '../ProductGallery';
import ContentWrapper from '../ContentWrapper';
import Button from '../Button';

import './PopularSection.module.css';

function PopularSection({ data, products, onClick, openCart, shopBtnText }) {
  return (
    <section styleName="PopularSection">
      <ContentWrapper>
        <SectionHeading text={data.popularHeading} isBig />

        <ProductGallery
          // products={products}
          catalog={products}
          onClick={onClick}
          openCart={openCart}
          isSlider
        />
      </ContentWrapper>
      <ContentWrapper>
        <div styleName="btn-wrapper">
          <div styleName="line" />
          <Button href="/shop" isFilled styleName="shop-btn">
            {shopBtnText}
          </Button>
          <div styleName="line" />
        </div>
      </ContentWrapper>
    </section>
  );
}

PopularSection.defaultProps = {
  shopBtnText: 'Магазин',
};

PopularSection.propTypes = {
  data: PropTypes.shape({
    popularHeading: PropTypes.string,
  }).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClick: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  shopBtnText: PropTypes.string,
};

export default PopularSection;
