import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import mouseIcon from '../../images/svg/scroll-down.svg';

function ScrollDown({ url }) {
  return (
    <Link to={url} className="ScrollDown">
      <img src={mouseIcon} alt="Прокрутите вниз" className="ScrollDown-mouse" />
      {/* <img src={arrowSrc} alt="" className="ScrollDown-arrow" /> */}
    </Link>
  );
}

ScrollDown.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ScrollDown;
