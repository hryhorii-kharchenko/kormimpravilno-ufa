import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import ProductCard from '../ProductCard';

import './ProductGallery.module.css';

function ProductGallery({ products, onClick, isSlider }) {
  const gallery = products.map(product => {
    if (!isSlider) {
      return (
        <ProductCard
          avatar={product.imageSmall.imageFile.childImageSharp.fluid}
          heading={product.product_post.productName}
          composition={product.product_post.composition}
          weight={product.product_post.weight}
          price={product.price}
          key={product.id}
          id={product.id}
          onClick={onClick}
        />
      );
    }
    return (
      <div styleName="product-wrapper" key={product.id}>
        <ProductCard
          avatar={product.imageSmall.imageFile.childImageSharp.fluid}
          heading={product.product_post.productName}
          composition={product.product_post.composition}
          weight={product.product_post.weight}
          price={product.price}
          id={product.id}
          onClick={onClick}
        />
      </div>
    );
  });

  if (!isSlider) {
    return <section styleName="ProductGallery">{gallery}</section>;
  }

  if (gallery.length === 1) {
    gallery.push(...gallery, ...gallery);
  }

  if (gallery.length === 2) {
    gallery.push(gallery[0]);
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...settings}
      styleName="Slider"
    >
      {gallery}
    </Slider>
  );
}

ProductGallery.defaultProps = {
  isSlider: false,
};

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
  isSlider: PropTypes.bool,
};

export default ProductGallery;
