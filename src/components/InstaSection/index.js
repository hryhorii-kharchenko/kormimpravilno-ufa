import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';
import ContentWrapper from '../ContentWrapper';
import InstaGallery from '../InstaGallery';

import './InstaSection.module.css';

function InstaSection({ data, instaNodes }) {
  const feed = instaNodes.map(({ featuredImg, permalink }) => ({
    imgSrc: featuredImg.childImageSharp.fixed,
    link: permalink,
  }));

  return (
    <section styleName="InstaSection" id="insta">
      <ContentWrapper>
        <SectionHeading text={data.instagramHeading} isBig />
        <SectionSubheading text={data.instagramSubheading} />

        <InstaGallery feed={feed} />
      </ContentWrapper>
    </section>
  );
}

InstaSection.propTypes = {
  data: PropTypes.shape({
    instagramHeading: PropTypes.string,
    instagramSubheading: PropTypes.string,
  }).isRequired,
  instaNodes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default InstaSection;
