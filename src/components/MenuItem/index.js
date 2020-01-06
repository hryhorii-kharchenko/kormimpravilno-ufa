import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import './MenuItem.module.css';

function MenuItem({ title, url, id }) {
  return (
    <li styleName="MenuItem">
      <Link to={url} styleName="link" id={id}>
        {title}
      </Link>
    </li>
  );
}

MenuItem.defaultProps = {
  id: '',
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default MenuItem;
