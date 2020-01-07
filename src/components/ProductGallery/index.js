import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import ProductCard from '../ProductCard';

import './ProductGallery.module.css';

function ProductGallery({
  catalog,
  products,
  onClick,
  isSlider,
  aimProductCount,
}) {
  const filtered = products.filter(elem => {
    return elem !== undefined;
  });

  if (filtered.length < aimProductCount) {
    const { length } = filtered;
    let position = 0;

    for (let i = 0; i < aimProductCount - length; i += 1) {
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

  for (let i = 0; i < aimProductCount - gallery.length; i += 0) {
    gallery.push(gallery[0]);
  }

  if (!isSlider) {
    return <section styleName="ProductGallery">{gallery}</section>;
  }

  if (isSlider && aimProductCount === 3) {
    let browserWidth = 1366;
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '50px',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            dots: false,
            centerPadding: '150px',
          },
        },
        {
          breakpoint: 815,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            dots: false,
            centerPadding: '60px',
          },
        },
        {
          breakpoint: 568,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            dots: false,
            centerPadding: '20px',
          },
        },
        {
          breakpoint: 490,
          settings: {
            slidesToShow: 1,
            centerMode: false,
            dots: false,
            centerPadding: '0px',
          },
        },
      ],
    };

    if (typeof window !== `undefined`) {
      browserWidth = window.innerWidth;
    }

    if (browserWidth < 1254) {
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
  products: [],
  isSlider: false,
  aimProductCount: 3,
};

ProductGallery.propTypes = {
  catalog: PropTypes.arrayOf(
    PropTypes.shape({
      imageSmall: PropTypes.shape({
        imageFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({ fluid: PropTypes.shape() }),
        }),
      }),
      product_post: PropTypes.shape({
        productName: PropTypes.string,
        composition: PropTypes.string,
        weight: PropTypes.string,
      }),
      price: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      imageSmall: PropTypes.shape({
        imageFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({ fluid: PropTypes.shape() }),
        }),
      }),
      product_post: PropTypes.shape({
        productName: PropTypes.string,
        composition: PropTypes.string,
        weight: PropTypes.string,
      }),
      price: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  onClick: PropTypes.func.isRequired,
  isSlider: PropTypes.bool,
  aimProductCount: PropTypes.number,
};

export default ProductGallery;
