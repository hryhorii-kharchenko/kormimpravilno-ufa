import React from 'react';
import PropTypes from 'prop-types';

import InstaCard from '../InstaCard';

import './InstaGallery.module.css';

function InstaGallery({ feed }) {
  const gallery = feed.map(post => (
    <InstaCard imgSrc={post.imgSrc} link={post.link} key={post.link} />
  ));

  return <section styleName="InstaGallery">{gallery}</section>;
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
