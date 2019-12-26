import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import Button from '../Button';
import ContentWrapper from '../ContentWrapper';
import SanitizeHTML from '../SanitizeHTML';

import './HowDeliverySection.module.css';

function HowDeliverySection({ data }) {
  return (
    <section styleName="HowDeliverySection" id="how">
      <ContentWrapper>
        <SectionHeading text={data.howHeading} />
        <div styleName="text">
          <SanitizeHTML html={data.howWysiwyg} />
        </div>
        <div styleName="btn-wrapper">
          <div styleName="line" />
          <Button href="/shop" isFilled styleName="button">
            В каталог
          </Button>
          <div styleName="line" />
        </div>
      </ContentWrapper>
    </section>
  );
}

HowDeliverySection.propTypes = {
  data: PropTypes.shape({
    howHeading: PropTypes.string,
    howWysiwyg: PropTypes.string,
  }).isRequired,
};

export default HowDeliverySection;
