import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import ScrollDown from '../ScrollDown';
import Wrapper from '../Wrapper';

function BannerSection({ data }) {
  return (
    <section className="Banner">
      <h1 className="Banner-title">
        {data.bannerHeading.firstLine}
        <strong>{data.bannerHeading.secondLine}</strong>
      </h1>

      <p className="Banner-subtitle">{data.bannerSubheading}</p>

      <Wrapper>
        <Button href="/shop" isFilled>
          {data.bannerBtnStore}
        </Button>
        <Button href="/recipes">{data.bannerBtnRecipes}</Button>
      </Wrapper>

      {/* <ScrollDown url={} mouseSrc={} arrowSrc={}/> */}
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
