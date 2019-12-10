import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import ScrollDown from '../ScrollDown';
import Wrapper from '../Wrapper';
import ContentWrapper from '../ContentWrapper';

import classes from './BannerSection.module.css';

function BannerSection({ data }) {
  return (
    <section className={classes.Banner} id="banner">
      <ContentWrapper>
        <h1 className={classes.title}>
          {data.bannerHeading.firstLine}
          <strong className={classes.secondLine}>
            {data.bannerHeading.secondLine}
          </strong>
        </h1>

        <p className={classes.subtitle}>{data.bannerSubheading}</p>

        <Wrapper>
          <Button href="/shop" isFilled>
            {data.bannerBtnStore}
          </Button>
          <Button href="/recipes">{data.bannerBtnRecipes}</Button>
        </Wrapper>

        <ScrollDown url="#company" />
      </ContentWrapper>
    </section>
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
};

export default BannerSection;
