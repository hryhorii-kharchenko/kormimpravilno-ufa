import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import ProductGallery from '../ProductGallery';

function PopularSection({ data, products, onClick }) {
  return (
    <section className="PopularSection">
      <SectionHeading text={data.popularHeading} />

      <ProductGallery products={products} onClick={onClick} />
    </section>
  );
}

PopularSection.propTypes = {
  data: PropTypes.shape({
    popularHeading: PropTypes.string,
  }).isRequired,
  products: PropTypes.shape.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PopularSection;
