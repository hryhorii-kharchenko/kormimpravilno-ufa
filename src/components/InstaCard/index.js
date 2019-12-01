import React from 'react';
import PropTypes from 'prop-types';

function InstaCard({ imgSrc, link }) {
  return (
    <a href={link} className="InstaCard">
      <img src={imgSrc} alt="Пост из Инстаграма" className="InstaCard-image" />
    </a>
  );
}

InstaCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default InstaCard;
