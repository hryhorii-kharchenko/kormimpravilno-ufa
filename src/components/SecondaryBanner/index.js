import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import BackgroundImg from 'gatsby-background-image-es5';
import ContentWrapper from '../ContentWrapper';

import './SecondaryBanner.module.css';

function SecondaryBanner({
  pageTitle,
  pageShortTitle,
  pathname,
  fluid,
  isAlignedLeft,
}) {
  if (!isAlignedLeft) {
    return (
      <BackgroundImg
        Tag="section"
        fluid={fluid}
        backgroundColor="black"
        styleName="SecondaryBanner"
        id="banner"
      >
        <ContentWrapper>
          <div styleName="breadcrumbs">
            <Link to="/" styleName="main-link">
              Главная
            </Link>
            <div styleName="dot" />
            <Link to={pathname} styleName="secondary-link">
              {pageShortTitle || pageTitle}
            </Link>
          </div>

          <div styleName="heading-wrapper">
            <h1 styleName="heading">{pageTitle}</h1>
            <div styleName="line" />
          </div>
        </ContentWrapper>
      </BackgroundImg>
    );
  }

  return (
    <section styleName="SecondaryBanner aligned-left" id="banner">
      <ContentWrapper>
        <div styleName="breadcrumbs">
          <Link to="/" styleName="main-link">
            Главная
          </Link>
          <div styleName="dot" />
          <Link to={pathname} styleName="secondary-link">
            {pageShortTitle || pageTitle}
          </Link>
        </div>

        <div styleName="heading-wrapper">
          <h1 styleName="heading">{pageTitle}</h1>
          <div styleName="line" />
        </div>
      </ContentWrapper>
    </section>
  );
}

SecondaryBanner.defaultProps = {
  pageShortTitle: null,
  fluid: null,
  isAlignedLeft: false,
};

SecondaryBanner.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageShortTitle: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  fluid: PropTypes.shape(),
  isAlignedLeft: PropTypes.bool,
};

export default SecondaryBanner;
