import React from 'react';
import PropTypes from 'prop-types';

import InstaCard from '../InstaCard';

function InstaGallery({ feed }) {
  const gallery = feed.map(post => (
    <InstaCard imgSrc={post.imgSrc} link={post.link} />
  ));

  return <section className="InstaGallery">{gallery}</section>;
}

InstaGallery.propTypes = {
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default InstaGallery;
