import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import ContentWrapper from '../ContentWrapper';

import './ProductBreadcrumbs.module.css';

function ProductBreadcrumbs({ productName, pathname }) {
  return (
    <section styleName="ProductBreadcrumbs" id="breadcrumbs">
      <ContentWrapper>
        <nav styleName="nav-wrapper">
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
      </ContentWrapper>
    </section>
  );
}

ProductBreadcrumbs.propTypes = {
  productName: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default ProductBreadcrumbs;
