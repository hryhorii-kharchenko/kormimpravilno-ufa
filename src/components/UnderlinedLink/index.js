import React from 'react';
import PropTypes from 'prop-types';

function UnderlinedLink({ text, href = '#', target = '_self' }) {
  return (
    <a href={href} target={target} className="UnderlinedLink">
      <p className="UnderlinedLink-text">{text}</p>
      <div className="UnderlinedLink-underline" />
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
