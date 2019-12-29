import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductBreadcrumbs from '../components/ProductBreadcrumbs';
import MainProductSection from '../components/MainProductSection';
import SimilarProductSection from '../components/SimilarProductSection';

function ProductLayout({
  // productName,
  // productId,
  // composition,
  // weight,
  // price,
  // cooking,
  // nutrition,
  // similar,
  // image,
  id,
  defaultImage,
  universal,
  cart,
  catalog,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
  location,
}) {
  const { price, image } = catalog;
  const {
    productName,
    composition,
    weight,
    cooking,
    nutrition,
    similar,
  } = catalog.product_post;

  const avatar = image || defaultImage;

  return (
    <Layout
      data={universal}
      cart={cart}
      catalog={catalog}
      addToCartBtnHandler={addToCartBtnHandler}
      cartRemoveOneStackHandler={cartRemoveOneStackHandler}
      cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
    >
      <SEO title={productName} />

      <ProductBreadcrumbs
        productName={productName}
        pathname={location.pathname}
      />
      <MainProductSection
        productName={productName}
        id={id}
        composition={composition}
        weight={weight}
        price={price}
        cooking={cooking}
        nutrition={nutrition}
        image={avatar}
        cart={cart}
        addToCartOnClick={addToCartBtnHandler}
        removeOneStackFromCartOnClick={cartRemoveOneStackHandler}
      />
      <SimilarProductSection similar={similar} catalog={catalog} />
    </Layout>
  );
}

ProductLayout.propTypes = {
  productName: PropTypes.string.isRequired,
  // productId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  composition: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  cooking: PropTypes.string.isRequired,
  nutrition: PropTypes.string.isRequired,
  similar: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
    third: PropTypes.string,
  }).isRequired,
  image: PropTypes.shape({
    imageFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape(),
      }),
    }),
  }).isRequired,
  defaultImage: PropTypes.shape({
    imageFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape(),
      }),
    }),
  }).isRequired,
  universal: PropTypes.shape().isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ProductLayout;
