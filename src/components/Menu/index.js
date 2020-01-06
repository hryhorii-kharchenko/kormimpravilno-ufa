import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../MenuItem';

import './Menu.module.css';

function Menu({ items, firstItemId }) {
  const itemsMapped = items.map((menuItem, i) => {
    if (i === 0) {
      return (
        <MenuItem
          title={menuItem.title}
          url={menuItem.url}
          key={menuItem.title}
          id={firstItemId}
        />
      );
    }
    return (
      <MenuItem
        title={menuItem.title}
        url={menuItem.url}
        key={menuItem.title}
      />
    );
  });

  return (
    <nav styleName="Menu">
      <ul styleName="wrapper">{itemsMapped}</ul>
    </nav>
  );
}

Menu.defaultProps = {
  firstItemId: '',
};

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  firstItemId: PropTypes.string,
};

export default Menu;
