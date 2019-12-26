import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../ContentWrapper';
import SectionHeading from '../SectionHeading';
import SanitizeHTML from '../SanitizeHTML';

import './PriceDeliverySection.module.css';

function PriceDeliverySection({ data }) {
  return (
    <section styleName="PriceDeliverySection" id="price">
      <ContentWrapper>
        <SectionHeading text={data.priceHeading} />
        <h3 styleName="subheading">{data.priceSubheading}</h3>
        <div styleName="text">
          <SanitizeHTML html={data.priceWysiwyg} />
        </div>
      </ContentWrapper>
    </section>
  );
}

PriceDeliverySection.propTypes = {
  data: PropTypes.shape({
    priceHeading: PropTypes.string,
    priceSubheading: PropTypes.string,
    priceWysiwyg: PropTypes.string,
  }).isRequired,
};

export default PriceDeliverySection;
