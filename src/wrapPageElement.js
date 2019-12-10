import React from 'react';
import PropTypes from 'prop-types';

import CartProvider from './components/CartProvider';
import CatalogProvider from './components/CatalogProvider';

const wrap = ({ element }) => (
  <CartProvider>
    <CatalogProvider>{element}</CatalogProvider>
  </CartProvider>
);

wrap.propTypes = {
  element: PropTypes.element.isRequired,
};

export default wrap;
