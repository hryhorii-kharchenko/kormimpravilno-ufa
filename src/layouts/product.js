import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductBreadcrumbs from '../components/ProductBreadcrumbs';
import MainProductSection from '../components/MainProductSection';
import SimilarProductSection from '../components/SimilarProductSection';

function ProductLayout({
  pageContext,
  cart,
  catalog,
  catalogFull,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  // cartRemoveWholeItemHandler,
  openCart,
  location,
}) {
  const { id, universal } = pageContext;
  const product = catalogFull.find(prod => prod.id === id);
  // const product = catalog.find(prod => prod.id === id);
  const { price, imageFull } = product;
  const {
    productName,
    composition,
    weight,
    cooking,
    nutrition,
    info,
    similar,
  } = product.product_post;

  const avatar = imageFull;

  function openCartDesktopOnly() {
    if (window.innerWidth > 800) {
      openCart();
    } else {
      const cartBtn = document.getElementById('mobile-cart-btn');
      cartBtn.classList.add('cart-btn-expanded');
      setTimeout(() => cartBtn.classList.remove('cart-btn-expanded'), 200);
    }
  }

  return (
    <Layout
      data={universal}
      cart={cart}
      // catalogFull={catalogFull}
      // addToCartBtnHandler={addToCartBtnHandler}
      // cartRemoveOneStackHandler={cartRemoveOneStackHandler}
      // cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
      openCart={openCart}
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
        info={info}
        image={avatar}
        cart={cart}
        addToCartOnClick={addToCartBtnHandler}
        removeOneStackFromCartOnClick={cartRemoveOneStackHandler}
        openCart={openCartDesktopOnly}
      />
      <SimilarProductSection
        similar={similar}
        catalog={catalog}
        addToCartBtnHandler={addToCartBtnHandler}
        openCart={openCartDesktopOnly}
      />
    </Layout>
  );
}

ProductLayout.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultImage: PropTypes.shape({
      imageFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape(),
        }),
      }),
    }),
    universal: PropTypes.shape().isRequired,
  }).isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  catalogFull: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  // cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ProductLayout;
