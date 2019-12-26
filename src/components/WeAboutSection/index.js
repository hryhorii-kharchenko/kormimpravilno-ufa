import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import ContentWrapper from '../ContentWrapper';
import SectionHeading from '../SectionHeading';
import BlockQuote from '../BlockQuote';

import './WeAboutSection.module.css';

function WeAboutSection({ data }) {
  return (
    <section styleName="WeAboutSection" id="we">
      <ContentWrapper>
        <div styleName="wrapper">
          <div styleName="text-wrapper">
            <SectionHeading text={data.weTitle} isAlignedLeft />
            <p styleName="text">{data.weText}</p>
          </div>
          <div styleName="img-wrapper">
            <Img
              fluid={data.weImg.imageFile.childImageSharp.fluid}
              styleName="image"
            />
          </div>

          <div styleName="frame-wrapper">
            <div styleName="frame" />
          </div>
        </div>

        <BlockQuote text={data.weQuote.text} author={data.weQuote.author} />
      </ContentWrapper>
    </section>
  );
}

WeAboutSection.propTypes = {
  data: PropTypes.shape({
    weTitle: PropTypes.string,
    weText: PropTypes.string,
    weImg: PropTypes.shape({
      imageFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape(),
        }),
      }),
    }),
    weQuote: PropTypes.shape({
      author: PropTypes.string,
      text: PropTypes.string,
    }),
  }).isRequired,
};

export default WeAboutSection;
