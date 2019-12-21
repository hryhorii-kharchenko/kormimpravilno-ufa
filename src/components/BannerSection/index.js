import React from 'react';
import PropTypes from 'prop-types';

import BackgroundImg from 'gatsby-background-image-es5';
import Button from '../Button';
import ScrollDown from '../ScrollDown';
import Wrapper from '../Wrapper';
import ContentWrapper from '../ContentWrapper';
import MainHeading from '../MainHeading';

import './BannerSection.module.css';

function BannerSection({ data, bgImg }) {
  const { fluid } = bgImg.childImageSharp;

  return (
    <BackgroundImg
      Tag="section"
      fluid={fluid}
      backgroundColor="black"
      styleName="Banner"
      id="banner"
    >
      <ContentWrapper>
        <MainHeading
          firstLine={data.bannerHeading.firstLine}
          secondLine={data.bannerHeading.secondLine}
        />

        <p styleName="subtitle">{data.bannerSubheading}</p>

        <Wrapper justifyContent="flex-start">
          <Button href="/shop" isFilled styleName="bannerBtn">
            {data.bannerBtnStore}
          </Button>
          <Button href="/recipes" styleName="bannerBtn">
            {data.bannerBtnRecipes}
          </Button>
        </Wrapper>

        <ScrollDown url="/#company" />
      </ContentWrapper>
    </BackgroundImg>
  );
}

BannerSection.propTypes = {
  data: PropTypes.shape({
    bannerHeading: PropTypes.shape({
      firstLine: PropTypes.string,
      secondLine: PropTypes.string,
    }),
    bannerSubheading: PropTypes.string,
    bannerBtnStore: PropTypes.string,
    bannerBtnRecipes: PropTypes.string,
  }).isRequired,
  bgImg: PropTypes.shape.isRequired,
};

export default BannerSection;
