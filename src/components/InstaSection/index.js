import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';
import ContentWrapper from '../ContentWrapper';
// import InstaGallery from '../InstaGallery/InstaGallery';

import './InstaSection.module.css';

function InstaSection({ data }) {
  return (
    <section styleName="InstaSection" id="insta">
      <ContentWrapper>
        <SectionHeading text={data.instagramHeading} />
        <SectionSubheading text={data.instagramSubheading} />

        {/* <InstaGallery feed={} /> */}
      </ContentWrapper>
    </section>
  );
}

InstaSection.propTypes = {
  data: PropTypes.shape({
    instagramHeading: PropTypes.string,
    instagramSubheading: PropTypes.string,
  }).isRequired,
};

export default InstaSection;
