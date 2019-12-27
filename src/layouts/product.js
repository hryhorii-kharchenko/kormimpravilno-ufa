import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductBreadcrumbs from '../components/ProductBreadcrumbs';
import MainProductSection from '../components/MainProductSection';
import SimilarProductSection from '../components/SimilarProductSection';

function ProductLayout({
  productName,
  productId,
  id,
  composition,
  weight,
  price,
  cooking,
  nutrition,
  similar,
  image,
  defaultImage,
  universal,
  cart,
  catalog,
  addToCartBtnHandler,
  cartRemoveOneItemHandler,
  cartRemoveAllItemsHandler,
  location,
}) {
  return (
    <Layout
      data={universal}
      cart={cart}
      catalog={catalog}
      addToCartBtnHandler={addToCartBtnHandler}
      cartRemoveOneItemHandler={cartRemoveOneItemHandler}
      cartRemoveAllItemsHandler={cartRemoveAllItemsHandler}
    >
      <SEO title={productName} />

      <ProductBreadcrumbs
        productName={productName}
        pathname={location.pathname}
      />
      <MainProductSection />
      <SimilarProductSection />
    </Layout>
  );
}

ProductLayout.defaultProps = {
  similar: {
    first: 1,
    second: 2,
    third: 3,
  },
  image: {
    imageFile: {
      childImageSharp: {
        fluid: null,
      },
    },
  },
};

ProductLayout.propTypes = {
  productName: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
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
  }),
  image: PropTypes.shape({
    imageFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape(),
      }),
    }),
  }),
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
  cartRemoveOneItemHandler: PropTypes.func.isRequired,
  cartRemoveAllItemsHandler: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ProductLayout;
