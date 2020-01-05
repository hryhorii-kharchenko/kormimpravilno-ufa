import React from 'react';
import PropTypes from 'prop-types';

import ShopProvider from './components/ShopProvider';

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]', {
    speed: 600,
    easing: 'easeInOutQuart',
  });
}

const wrap = ({ element }) => <ShopProvider>{element}</ShopProvider>;

wrap.propTypes = {
  element: PropTypes.element.isRequired,
};

export default wrap;
