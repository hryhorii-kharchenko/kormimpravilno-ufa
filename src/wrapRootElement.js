import React from 'react';
import PropTypes from 'prop-types';

import CartProvider from './components/CartProvider';

const wrap = ({ element }) => <CartProvider>{element}</CartProvider>;

wrap.propTypes = {
  element: PropTypes.element.isRequired,
};

export default wrap;
