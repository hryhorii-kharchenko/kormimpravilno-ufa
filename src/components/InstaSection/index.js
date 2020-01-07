import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';
import ContentWrapper from '../ContentWrapper';
import InstaGallery from '../InstaGallery';

import './InstaSection.module.css';
import insta1 from '../../images/insta/insta-1.jpg';
import insta2 from '../../images/insta/insta-2.jpg';
import insta3 from '../../images/insta/insta-3.jpg';
import insta4 from '../../images/insta/insta-4.jpg';
import insta5 from '../../images/insta/insta-5.jpg';
import insta6 from '../../images/insta/insta-6.jpg';
import insta7 from '../../images/insta/insta-7.jpg';
import insta8 from '../../images/insta/insta-8.jpg';

function InstaSection({ data }) {
  const feed = [];

  feed.push({
    imgSrc: insta1,
    link: 'https://www.instagram.com/kormim_pravilno/#1',
  });
  feed.push({
    imgSrc: insta2,
    link: 'https://www.instagram.com/kormim_pravilno/#2',
  });
  feed.push({
    imgSrc: insta3,
    link: 'https://www.instagram.com/kormim_pravilno/#3',
  });
  feed.push({
    imgSrc: insta4,
    link: 'https://www.instagram.com/kormim_pravilno/#4',
  });
  feed.push({
    imgSrc: insta5,
    link: 'https://www.instagram.com/kormim_pravilno/#5',
  });
  feed.push({
    imgSrc: insta6,
    link: 'https://www.instagram.com/kormim_pravilno/#6',
  });
  feed.push({
    imgSrc: insta7,
    link: 'https://www.instagram.com/kormim_pravilno/#7',
  });
  feed.push({
    imgSrc: insta8,
    link: 'https://www.instagram.com/kormim_pravilno/#8',
  });

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
};

export default InstaSection;
