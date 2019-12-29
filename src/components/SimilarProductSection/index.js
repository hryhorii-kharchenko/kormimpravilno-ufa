import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import ContentWrapper from '../ContentWrapper';
import ProductGallery from '../ProductGallery';
import Button from '../Button';

function SimilarProductSection({ similar, catalog }) {
  const products = [];

  products.push(catalog.find(() => catalog.productId === similar.first));
  products.push(catalog.find(() => catalog.productId === similar.second));
  products.push(catalog.find(() => catalog.productId === similar.third));

  return (
    <section styleName="SimilarProductSection" id="similar">
      <ContentWrapper>
        <SectionHeading text="Вас может заинтересовать" />

        <ProductGallery products={products} isSlider />

        <div styleName="btn-wrapper">
          <div styleName="line" />
          <Button href="/shop" styleName="button">
            Магазин
          </Button>
          <div styleName="line" />
        </div>
      </ContentWrapper>
    </section>
  );
}

SimilarProductSection.propTypes = {
  similar: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
    third: PropTypes.string,
  }).isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SimilarProductSection;
