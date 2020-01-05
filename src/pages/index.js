import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

import BannerSection from '../components/BannerSection';
import CompanySection from '../components/CompanySection';
import HowSection from '../components/HowSection';
import PopularSection from '../components/PopularSection';
import RecipeSection from '../components/RecipeSection';
import InstaSection from '../components/InstaSection';

function IndexPage({
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

  const page = data.wpgraphql.mainPage.main_page;
  const universal = data.wpgraphql.universalPage.universal_page;
  const posts = data.wpgraphql.posts.nodes;

  const banner = getSectionEntriesFromPage('banner', page);
  const company = getSectionEntriesFromPage('company', page);
  const how = getSectionEntriesFromPage('how', page);
  const popular = getSectionEntriesFromPage('popular', page);
  const recipe = getSectionEntriesFromPage('recipe', page);
  const instagram = getSectionEntriesFromPage('instagram', page);

  for (let i = 0; i < posts.length; i += 1) {
    if (!posts[i].featuredImageSmall) {
      posts[i].featuredImageSmall = {};
      posts[i].featuredImageSmall.imageFile = data.defaultImageSmall;
    }

    if (posts[i].slug[0] !== '/') {
      posts[i].slug = `/${posts[i].slug}`;
    }
  }

  return (
    <Layout
      data={universal}
      cart={cart}
      catalog={catalog}
      addToCartBtnHandler={addToCartBtnHandler}
      cartRemoveOneStackHandler={cartRemoveOneStackHandler}
      cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
    >
      <SEO title="Главная" />

      <BannerSection data={banner} bgImg={data.bannerBg} />
      <CompanySection data={company} />
      <HowSection data={how} />
      <PopularSection
        data={popular}
        products={catalog}
        onClick={addToCartBtnHandler}
        shopBtnText={banner.bannerBtnStore}
      />
      <RecipeSection data={recipe} recipes={posts} />
      <InstaSection data={instagram} />
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    bannerBg: PropTypes.shape.isRequired,
    defaultImageSmall: PropTypes.shape.isRequired,
    wpgraphql: PropTypes.shape({
      mainPage: PropTypes.shape({
        main_page: PropTypes.shape(),
      }),
      universalPage: PropTypes.shape({
        universal_page: PropTypes.shape(),
      }),
      posts: PropTypes.shape(),
      products: PropTypes.shape(),
    }),
  }).isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
};

export default IndexPage;

export const query = graphql`
  query indexQuery {
    bannerBg: file(relativePath: { eq: "bg-banner.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    defaultImageSmall: file(relativePath: { eq: "default.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 385, maxHeight: 217) {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    }
    wpgraphql {
      mainPage: page(id: "cGFnZToxNw==") {
        id
        main_page {
          bannerBtnRecipes
          bannerBtnStore
          bannerHeading {
            fieldGroupName
            firstLine
            secondLine
          }
          bannerSubheading
          companyBtnSignup
          companyHeading
          companySubheading
          companyQuote
          howHeading
          howQuote
          howChainFirst {
            text
            heading
            fieldGroupName
          }
          howChainSecond {
            text
            heading
            fieldGroupName
          }
          howChainThird {
            text
            heading
            fieldGroupName
          }
          howChainFourth {
            text
            heading
            fieldGroupName
          }
          instagramHeading
          instagramSubheading
          popularBtnStore
          popularHeading
          recipesHeading
          recipesSubheading
          fieldGroupName
        }
      }
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
      posts {
        nodes {
          id
          recipe_post {
            recipeName
            description
          }
          slug
          featuredImageSmall: featuredImage {
            sourceUrl
            mediaItemId
            modified
            imageFile {
              childImageSharp {
                fluid(maxWidth: 385, maxHeight: 217) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
