import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

function NotFoundPage({
  data,
  catalog,
  cart,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
  openCart
}) {
  const universal = data.wpgraphql.universalPage.universal_page;

  return (
    <Layout
      data={universal}
      cart={cart}
      // catalog={catalog}
      // addToCartBtnHandler={addToCartBtnHandler}
      // cartRemoveOneStackHandler={cartRemoveOneStackHandler}
      // cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
      openCart={openCart}
    >
      <SEO title="404" />

      <h1>404 - Страница не найдена</h1>
    </Layout>
  );
}

NotFoundPage.propTypes = {
  data: PropTypes.shape().isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
};

export default NotFoundPage;

export const query = graphql`
  query pageNotFoundQuery {
    wpgraphql {
      universalPage: page(id: "cGFnZToyMDg=") {
        universal_page {
          copyright
          inn
          instaLink
          orgn
          ooo
          phone
        }
      }
    }
  }
`;
