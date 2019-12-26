import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../ContentWrapper';
import SectionHeading from '../SectionHeading';
import SanitizeHTML from '../SanitizeHTML';

import './ConfirmationDeliverySection.module.css';

function ConfirmationDeliverySection({ data }) {
  return (
    <section styleName="ConfirmationDeliverySection" id="confirmation">
      <ContentWrapper>
        <SectionHeading text={data.confirmationHeading} />
        <div styleName="text">
          <SanitizeHTML html={data.confirmationWysiwyg} />
        </div>
      </ContentWrapper>
    </section>
  );
}

ConfirmationDeliverySection.propTypes = {
  data: PropTypes.shape({
    confirmationHeading: PropTypes.string,
    confirmationWysiwyg: PropTypes.string,
  }).isRequired,
};

export default ConfirmationDeliverySection;
