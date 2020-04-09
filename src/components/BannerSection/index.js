import React from 'react';
import PropTypes from 'prop-types';

import BackgroundImg from 'gatsby-background-image-es5';
import Button from '../Button';
import ScrollDown from '../ScrollDown';
import Wrapper from '../Wrapper';
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
      <div styleName="banner-wrapper">
        <div styleName="content-wrapper">
          <MainHeading
            firstLine={data.bannerHeading.firstLine}
            secondLine={data.bannerHeading.secondLine}
          />

          <p styleName="subtitle">{data.bannerSubheading}</p>

          <Wrapper
            justifyContent="flex-start"
            flexWrap="wrap"
            marginTop="-15px"
          >
            <Button href="/shop" isFilled styleName="bannerBtn">
              {data.bannerBtnStore}
            </Button>
            <Button href="/#recipes" styleName="bannerBtn">
              {data.bannerBtnRecipes}
            </Button>
            <Button
              isExternal
              target="_blank"
              href={data.bannerBtnRecomendedLink}
              styleName="bannerBtn longBannerBtn"
            >
              {data.bannerBtnRecomendedText}
            </Button>
          </Wrapper>
        </div>
      </div>

      <ScrollDown url="/#company" />

      <div styleName="overlay" />
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
    bannerBtnRecomendedText: PropTypes.string,
    bannerBtnRecomendedLink: PropTypes.string,
  }).isRequired,
  bgImg: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape(),
    }),
  }).isRequired,
};

export default BannerSection;
