import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

function Logo({ isAlt }) {
  return (
    <Link to="/" className="Logo">
      <img
        src={src}
        alt="Кормим правильно"
        className={isAlt ? 'Logo-img-alt' : 'Logo-img'}
      />
    </Link>
  );
}

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  isAlt: PropTypes.bool,
};

Logo.defaultProps = {
  isAlt: false,
};

export default Logo;
