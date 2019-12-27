import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

function ProductBreadcrumbs({ productName, pathname }) {
  return (
    <nav className="ProductBreadcrumbs">
      <Link to="/" className="main-link">
        Главная
      </Link>
      <div className="dot" />
      <Link to="/shop" className="shop-link">
        Магазин
      </Link>
      <div className="dot" />
      <Link to={pathname} className="curr-link">
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
