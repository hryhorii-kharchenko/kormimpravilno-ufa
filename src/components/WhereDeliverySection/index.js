import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import ContentWrapper from '../ContentWrapper';
import SectionHeading from '../SectionHeading';
import SanitizeHTML from '../SanitizeHTML';

import './WhereDeliverySection.module.css';

function WhereDeliverySection({ data }) {
  return (
    <section styleName="WhereDeliverySection" id="where">
      <ContentWrapper>
        <div styleName="wrapper">
          <div styleName="text-wrapper">
            {/* <SectionHeading text={data.whereHeading} isAlignedLeft /> */}
            <div styleName="text">
              <SanitizeHTML html={data.whereWysiwyg} />
            </div>
          </div>
          <div styleName="img-wrapper">
            <Img
              fluid={data.whereImg.imageFile.childImageSharp.fluid}
              styleName="image"
            />
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

WhereDeliverySection.propTypes = {
  data: PropTypes.shape({
    // whereHeading: PropTypes.string,
    whereWysiwyg: PropTypes.string,
    whereImg: PropTypes.shape({
      imageFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape(),
        }),
      }),
    }),
  }).isRequired,
};

export default WhereDeliverySection;
