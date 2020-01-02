import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import ProductCard from '../ProductCard';

import './ProductGallery.module.css';

function ProductGallery({ catalog, products, onClick, isSlider }) {
  const filtered = products.filter(elem => {
    return elem !== undefined;
  });

  if (filtered.length < 3) {
    const { length } = filtered;
    let position = 0;

    for (let i = 0; i < 3 - length; i += 1) {
      while (catalog.includes(filtered[position])) {
        position += 1;
      }
      if (catalog[position]) {
        filtered.push(catalog[position]);
      }
      position += 1;
    }
  }

  const gallery = filtered.map(product => {
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
          slug={product.slug}
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
          slug={product.slug}
          onClick={onClick}
        />
      </div>
    );
  });

  for (let i = 0; i < 3 - gallery.length; i += 0) {
    gallery.push(gallery[0]);
  }

  if (!isSlider) {
    return <section styleName="ProductGallery">{gallery}</section>;
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
  catalog: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.shape,
      productName: PropTypes.string,
      composition: PropTypes.string,
      weight: PropTypes.string,
      price: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
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
