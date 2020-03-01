import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import './InstaCard.module.css';

function InstaCard({ imgSrc, link }) {
  return (
    <a href={link} styleName="InstaCard">
      <Img fixed={imgSrc} alt="Пост из Инстаграма" styleName="image" />
    </a>
  );
}

InstaCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default InstaCard;
