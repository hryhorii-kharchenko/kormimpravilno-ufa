import React from 'react';
import PropTypes from 'prop-types';

import ProductCard from '../ProductCard';

function ProductGallery({ products, onClick }) {
  const gallery = products.map(product => (
    <ProductCard
      // imgSrc={product.imgSrc}
      // btnIconSrc={product.btnIconSrc}
      heading={product.productName}
      composition={product.composition}
      weigth={product.weigth}
      price={product.price}
      id={product.id}
      onClick={onClick}
    />
  ));

  return <section className="ProductGallery">{gallery}</section>;
}

ProductGallery.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      // imgSrc: PropTypes.string,
      // btnIconSrc: PropTypes.string,
      productName: PropTypes.string,
      composition: PropTypes.string,
      weigth: PropTypes.string,
      price: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductGallery;
