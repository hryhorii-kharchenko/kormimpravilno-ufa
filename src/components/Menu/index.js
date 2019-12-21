import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../MenuItem';

import './Menu.module.css';

function Menu({ items }) {
  const itemsMapped = items.map(menuItem => (
    <MenuItem title={menuItem.title} url={menuItem.url} key={menuItem.title} />
  ));

  return (
    <nav styleName="Menu">
      <ul styleName="wrapper">{itemsMapped}</ul>
    </nav>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default Menu;
