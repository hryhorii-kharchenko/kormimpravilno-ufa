import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

function ShopPage({
  data,
  catalog,
  cart,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
}) {
  function getSectionEntriesFromPage(sectionName, sourceObject) {
    return Object.fromEntries(
      Object.entries(sourceObject).filter(field =>
        field[0].includes(sectionName)
      )
    );
  }

  const universal = data.wpgraphql.universalPage.universal_page;

  return (
    <Layout
      data={universal}
      cart={cart}
      catalog={catalog}
      addToCartBtnHandler={addToCartBtnHandler}
      cartRemoveOneStackHandler={cartRemoveOneStackHandler}
      cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
    >
      <SEO title="Магазин" />
    </Layout>
  );
}

ShopPage.propTypes = {
  data: PropTypes.shape().isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
};

export default ShopPage;

export const query = graphql`
  query shopQuery {
    bannerBg: file(relativePath: { eq: "bg-banner.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
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
