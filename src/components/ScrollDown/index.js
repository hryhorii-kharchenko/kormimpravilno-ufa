import React from 'react';
import PropTypes from 'prop-types';

function ScrollDown({ url, mouseSrc, arrowSrc }) {
  return (
    <a href={url} className="ScrollDown">
      <img src={mouseSrc} alt="Прокрутите вниз" className="ScrollDown-mouse" />
      <img src={arrowSrc} alt="" className="ScrollDown-arrow" />
    </a>
  );
}

ScrollDown.propTypes = {
  url: PropTypes.string.isRequired,
  mouseSrc: PropTypes.string.isRequired,
  arrowSrc: PropTypes.string.isRequired,
};

export default ScrollDown;
