import React from 'react';
import PropTypes from 'prop-types';

import ShopProvider from './components/ShopProvider';

const wrap = ({ element }) => <ShopProvider>{element}</ShopProvider>;

wrap.propTypes = {
  element: PropTypes.element.isRequired,
};

export default wrap;
