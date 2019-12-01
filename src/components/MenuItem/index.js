import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

function MenuItem({ title, url }) {
  return (
    <li className="MenuItem">
      <Link to={url} className="MenuItem-link">
        {title}
      </Link>
    </li>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default MenuItem;
