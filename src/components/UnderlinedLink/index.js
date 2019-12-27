import React from 'react';
import PropTypes from 'prop-types';

import './UnderlinedLink.module.css';
import arrowImg from '../../images/svg/arrow-next.svg';

function UnderlinedLink({ text, className }) {
  return (
    <div styleName="UnderlinedLink" className={className}>
      <p styleName="text">{text}</p>
      <img src={arrowImg} alt="" styleName="arrow" />

      <div styleName="underline" />
    </div>
  );
}

UnderlinedLink.defaultProps = {
  className: '',
};

UnderlinedLink.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default UnderlinedLink;
