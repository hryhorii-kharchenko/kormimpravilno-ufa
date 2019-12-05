import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';
// import InstaGallery from '../InstaGallery/InstaGallery';

function InstaSection({ data }) {
  return (
    <section className="InstaSection" id="insta">
      <SectionHeading text={data.instagramHeading} />
      <SectionSubheading text={data.instagramSubheading} />

      {/* <InstaGallery feed={} /> */}
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
