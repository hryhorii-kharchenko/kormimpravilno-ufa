import React from 'react';
import PropTypes from 'prop-types';

import ProductCard from '../ProductCard';

import './ProductGallery.module.css';

function ProductGallery({ products, onClick }) {
  const gallery = products.map(product => (
    <ProductCard
      avatar={product.image.imageFile.childImageSharp.fluid}
      heading={product.product_post.productName}
      composition={product.product_post.composition}
      weight={product.product_post.weight}
      price={product.price}
      key={product.id}
      id={product.id}
      onClick={onClick}
    />
  ));

  return <section styleName="ProductGallery">{gallery}</section>;
}

ProductGallery.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.shape,
      productName: PropTypes.string,
      composition: PropTypes.string,
      weight: PropTypes.string,
      price: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductGallery;
