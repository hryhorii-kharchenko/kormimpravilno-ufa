import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

function ScrollDown({ url }) {
  return (
    <Link href={url} className="ScrollDown">
      <img src={mouseSrc} alt="Прокрутите вниз" className="ScrollDown-mouse" />
      <img src={arrowSrc} alt="" className="ScrollDown-arrow" />
    </Link>
  );
}

ScrollDown.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ScrollDown;
