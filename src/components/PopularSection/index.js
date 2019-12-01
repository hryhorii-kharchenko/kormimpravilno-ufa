import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import ProductGallery from '../ProductGallery';

function PopularSection({ data }) {
  return (
    <section className="PopularSection">
      <SectionHeading text={data.popularHeading} />

      {/* <ProductGallery products={} /> */}
    </section>
  );
}

PopularSection.propTypes = {
  data: PropTypes.shape({
    popularHeading: PropTypes.string,
  }).isRequired,
};

export default PopularSection;
