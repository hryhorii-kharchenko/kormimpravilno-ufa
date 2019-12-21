import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import './MenuItem.module.css';

function MenuItem({ title, url }) {
  return (
    <li styleName="MenuItem">
      <Link to={url} styleName="link">
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
