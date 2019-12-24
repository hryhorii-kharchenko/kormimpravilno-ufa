import React from 'react';
import PropTypes from 'prop-types';

import './UnderlinedLink.module.css';
import arrowImg from '../../images/svg/arrow-next.svg';

function UnderlinedLink({ text, href = '#', target = '_self' }) {
  return (
    <a href={href} target={target} styleName="UnderlinedLink">
      <p styleName="text">{text}</p>
      <img src={arrowImg} alt="" styleName="arrow" />

      <div styleName="underline" />
    </a>
  );
}

UnderlinedLink.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
};

UnderlinedLink.defaultProps = {
  href: '#',
  target: '_self',
};

export default UnderlinedLink;
