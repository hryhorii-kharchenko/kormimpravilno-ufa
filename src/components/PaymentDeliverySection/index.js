import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import SectionHeading from '../SectionHeading';
import ContentWrapper from '../ContentWrapper';

import './PaymentDeliverySection.module.css';
import mirLogoImg from '../../images/icons/logo-mir.svg';
import visaLogoImg from '../../images/icons/logo-visa.svg';
import mcLogoImg from '../../images/icons/logo-mastercard.svg';
import jcbLogoImg from '../../images/icons/logo-jcb.svg';
import SanitizeHTML from '../SanitizeHTML';

function PaymentDeliverySection({ data }) {
  return (
    <section styleName="PaymentDeliverySection" id="payment">
      <ContentWrapper>
        <div styleName="first-row">
          <div styleName="payment-ways-wrapper">
            <SectionHeading text={data.paymentHeading} isAlignedLeft />
            <p styleName="payment-ways-description">{data.paymentText}</p>

            <h3 styleName="payment-ways-subheading">
              {data.paymentSubheading}
            </h3>
            <h4 styleName="payment-way-heading">{data.paymentWays1.heading}</h4>
            <div styleName="payment-way-text">
              <SanitizeHTML html={data.paymentWays1.wysiwyg} />
            </div>
          </div>

          <div styleName="logos-wrapper">
            <div styleName="logo">
              <img
                src={mirLogoImg}
                alt="МИР"
                styleName="logo-img logo-mir-img"
              />
            </div>
            <div styleName="logo">
              <img
                src={visaLogoImg}
                alt="Visa"
                styleName="logo-img logo-visa-img"
              />
            </div>
            <div styleName="logo">
              <img
                src={mcLogoImg}
                alt="Mastercard"
                styleName="logo-img logo-mc-img"
              />
            </div>
            <div styleName="logo">
              <img
                src={jcbLogoImg}
                alt="JCB"
                styleName="logo-img logo-jcb-img"
              />
            </div>
          </div>
        </div>
        <div styleName="second-row">
          <div styleName="img-wrapper">
            <Img
              fluid={data.paymentImg.imageFile.childImageSharp.fluid}
              styleName="image"
            />
          </div>

          <div styleName="text-wrapper">
            <div styleName="instruction">
              <SanitizeHTML html={data.paymentInstruction} />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

PaymentDeliverySection.propTypes = {
  data: PropTypes.shape({
    paymentHeading: PropTypes.string,
    paymentSubheading: PropTypes.string,
    paymentInstruction: PropTypes.string,
    paymentText: PropTypes.string,
    paymentWays1: PropTypes.shape({
      heading: PropTypes.string,
      wysiwyg: PropTypes.string,
    }),
    paymentImg: PropTypes.shape({
      imageFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape(),
        }),
      }),
    }),
  }).isRequired,
};

export default PaymentDeliverySection;
