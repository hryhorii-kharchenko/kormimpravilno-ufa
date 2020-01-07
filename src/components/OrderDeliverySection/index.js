import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import ContentWrapper from '../ContentWrapper';
import SectionHeading from '../SectionHeading';
import SanitizeHTML from '../SanitizeHTML';

import './OrderDeliverySection.module.css';
import leafImg from '../../images/icons/leaf.svg';

function OrderDeliverySection({ data }) {
  return (
    <section styleName="OrderDeliverySection" id="order">
      <ContentWrapper>
        <div styleName="wrapper">
          <div styleName="text-wrapper">
            <SectionHeading text={data.orderHeading} isAlignedLeft />
            <div styleName="text">
              <SanitizeHTML html={data.orderWysiwyg} />
            </div>
            <img src={leafImg} alt="" styleName="decoration" />
          </div>
          <div styleName="img-wrapper">
            <Img
              fluid={data.orderImg.imageFile.childImageSharp.fluid}
              styleName="image"
            />
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

OrderDeliverySection.propTypes = {
  data: PropTypes.shape({
    orderHeading: PropTypes.string,
    orderWysiwyg: PropTypes.string,
    orderImg: PropTypes.shape({
      imageFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape(),
        }),
      }),
    }),
  }).isRequired,
};

export default OrderDeliverySection;
