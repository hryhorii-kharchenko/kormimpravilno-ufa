import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import fromEntries from 'object.fromentries';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SecondaryBanner from '../components/SecondaryBanner';
import WeAboutSection from '../components/WeAboutSection';
import ContactsAboutSection from '../components/ContactsAboutSection';

function AboutPage({
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
  const page = data.wpgraphql.aboutPage.about_page;
  const bannerBgFluid = data.bannerBg.childImageSharp.fluid;
  const { pageTitle } = page;
  const { pathname } = location;

  const we = getSectionEntriesFromPage('we', page);
  const contacts = getSectionEntriesFromPage('contacts', page);

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
      <SEO title="О нас" />

      <SecondaryBanner
        pageTitle={pageTitle}
        pathname={pathname}
        fluid={bannerBgFluid}
      />
      <WeAboutSection data={we} />
      <ContactsAboutSection data={contacts} />
    </Layout>
  );
}

AboutPage.propTypes = {
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

export default AboutPage;

export const query = graphql`
  query aboutQuery {
    bannerBg: file(relativePath: { eq: "bg-about.jpg" }) {
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
      aboutPage: page(id: "cGFnZToyMw==") {
        about_page {
          contactsAgreement
          contactsEmail
          contactsHeading
          contactsOferta
          contactsPhone
          contactsShops {
            address1
            address2
            address3
            address4
            address5
            workingHours1
            workingHours2
            workingHours3
            workingHours4
            workingHours5
            map1
            map2
            map3
            map4
            map5
          }
          pageTitle
          weText
          weTitle
          weImg {
            sourceUrl
            mediaItemId
            modified
            imageFile {
              childImageSharp {
                fluid(quality: 90, maxWidth: 548) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          weQuote {
            author
            text
          }
        }
      }
    }
  }
`;
