import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import fromEntries from 'object.fromentries';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SecondaryBanner from '../components/SecondaryBanner';
import HowDeliverySection from '../components/HowDeliverySection';
import OrderDeliverySection from '../components/OrderDeliverySection';
import ConfirmationDeliverySection from '../components/ConfirmationDeliverySection';
import PaymentDeliverySection from '../components/PaymentDeliverySection';
import PriceDeliverySection from '../components/PriceDeliverySection';
import WhereDeliverySection from '../components/WhereDeliverySection';

function DeliveryPage({
  data,
  catalog,
  cart,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
  openCart,
  location,
}) {
  function getSectionEntriesFromPage(sectionName, sourceObject) {
    if (!Object.fromEntries) {
      fromEntries.shim();
    }

    return Object.fromEntries(
      Object.entries(sourceObject).filter(field =>
        field[0].includes(sectionName)
      )
    );
  }

  const universal = data.wpgraphql.universalPage.universal_page;
  const page = data.wpgraphql.deliveryPage.delivery_page;
  const bannerBgFluid = data.bannerBg.childImageSharp.fluid;
  const { pageTitle } = page;
  const { pathname } = location;

  const how = getSectionEntriesFromPage('how', page);
  const order = getSectionEntriesFromPage('order', page);
  const confirmation = getSectionEntriesFromPage('confirmation', page);
  const payment = getSectionEntriesFromPage('payment', page);
  const price = getSectionEntriesFromPage('price', page);
  const where = getSectionEntriesFromPage('where', page);

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
      <SEO title="Доставка и оплата" />

      <SecondaryBanner
        pageTitle={pageTitle}
        pageShortTitle="Доставка и оплата"
        pathname={pathname}
        fluid={bannerBgFluid}
        isDeliveryHeading
      />
      <HowDeliverySection data={how} />
      <OrderDeliverySection data={order} />
      <ConfirmationDeliverySection data={confirmation} />
      <PaymentDeliverySection data={payment} />
      <PriceDeliverySection data={price} />
      <WhereDeliverySection data={where} />
    </Layout>
  );
}

DeliveryPage.propTypes = {
  data: PropTypes.shape().isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default DeliveryPage;

export const query = graphql`
  query deliveryQuery {
    bannerBg: file(relativePath: { eq: "bg-delivery.jpg" }) {
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
          city
        }
      }
      deliveryPage: page(id: "cGFnZToyMQ==") {
        delivery_page {
          confirmationHeading
          confirmationWysiwyg
          howHeading
          howWysiwyg
          orderHeading
          orderWysiwyg
          pageTitle
          paymentHeading
          paymentInstruction
          paymentSubheading
          paymentText
          priceHeading
          priceSubheading
          priceWysiwyg
          whereWysiwyg
          orderImg {
            sourceUrl
            mediaItemId
            modified
            imageFile {
              childImageSharp {
                fluid(quality: 90, maxWidth: 601) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          paymentImg {
            sourceUrl
            mediaItemId
            modified
            imageFile {
              childImageSharp {
                fluid(quality: 90, maxWidth: 601) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          paymentWays1 {
            heading
            wysiwyg
          }
          whereImg {
            sourceUrl
            mediaItemId
            modified
            imageFile {
              childImageSharp {
                fluid(quality: 90, maxWidth: 601) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
