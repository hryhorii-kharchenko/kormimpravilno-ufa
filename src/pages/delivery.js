import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

function DeliveryPage({
  data,
  catalog,
  cart,
  addToCartBtnHandler,
  cartRemoveOneItemHandler,
  cartRemoveAllItemsHandler,
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
      cartRemoveOneItemHandler={cartRemoveOneItemHandler}
      cartRemoveAllItemsHandler={cartRemoveAllItemsHandler}
    >
      <SEO title="Доставка и оплата" />
    </Layout>
  );
}

DeliveryPage.propTypes = {
  data: PropTypes.shape().isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneItemHandler: PropTypes.func.isRequired,
  cartRemoveAllItemsHandler: PropTypes.func.isRequired,
};

export default DeliveryPage;

export const query = graphql`
  query indexQuery {
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
