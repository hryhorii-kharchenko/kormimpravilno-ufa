import React from 'react';
import PropTypes from 'prop-types';

import ProductCard from '../ProductCard/ProductCard';

function ProductGallery({ products }) {
  const gallery = products.map(product => (
    <ProductCard
      imgSrc={product.imgSrc}
      btnIconSrc={product.btnIconSrc}
      heading={product.heading}
      composition={product.composition}
      weigth={product.weigth}
      price={product.price}
      itemId={product.itemId}
    />
  ));

  return <section className="ProductGallery">{gallery}</section>;
}

ProductGallery.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      btnIconSrc: PropTypes.string,
      heading: PropTypes.string,
      composition: PropTypes.string,
      weigth: PropTypes.string,
      price: PropTypes.string,
      itemId: PropTypes.string,
    })
  ).isRequired,
};

export default ProductGallery;
