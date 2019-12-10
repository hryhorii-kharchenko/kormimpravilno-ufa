import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import ProductGallery from '../ProductGallery';
import ContentWrapper from '../ContentWrapper';

function PopularSection({ data, products, onClick }) {
  return (
    <section className="PopularSection">
      <ContentWrapper>
        <SectionHeading text={data.popularHeading} />

        <ProductGallery products={products} onClick={onClick} />
      </ContentWrapper>
    </section>
  );
}

PopularSection.propTypes = {
  data: PropTypes.shape({
    popularHeading: PropTypes.string,
  }).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PopularSection;
