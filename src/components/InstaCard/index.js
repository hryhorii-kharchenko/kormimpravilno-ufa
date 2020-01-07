import React from 'react';
import PropTypes from 'prop-types';

import './InstaCard.module.css';

function InstaCard({ imgSrc, link }) {
  return (
    <a href={link} styleName="InstaCard">
      <img src={imgSrc} alt="Пост из Инстаграма" styleName="image" />
    </a>
  );
}

InstaCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default InstaCard;
