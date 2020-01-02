import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './ProductBreadcrumbs.module.css';

function ProductBreadcrumbs({ productName, pathname }) {
  return (
    <nav styleName="ProductBreadcrumbs">
      <Link to="/" styleName="main-link">
        Главная
      </Link>
      <div styleName="dot" />
      <Link to="/shop" styleName="shop-link">
        Магазин
      </Link>
      <div styleName="dot" />
      <Link to={pathname} styleName="curr-link">
        {productName}
      </Link>
    </nav>
  );
}

ProductBreadcrumbs.propTypes = {
  productName: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default ProductBreadcrumbs;
