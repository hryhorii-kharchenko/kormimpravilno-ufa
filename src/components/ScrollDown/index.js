import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './ScrollDown.module.css';
import mouseIcon from '../../images/svg/scroll-down.svg';

function ScrollDown({ url }) {
  return (
    <Link to={url} className="ScrollDown">
      <img src={mouseIcon} alt="Прокрутите вниз" styleName="mouse" />
    </Link>
  );
}

ScrollDown.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ScrollDown;
