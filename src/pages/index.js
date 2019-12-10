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

  const page = data.wpgraphql.mainPage.main_page;
  const universal = data.wpgraphql.universalPage.universal_page;
  const posts = data.wpgraphql.posts.nodes;

  const banner = getSectionEntriesFromPage('banner', page);
  const company = getSectionEntriesFromPage('company', page);
  const how = getSectionEntriesFromPage('how', page);
  const popular = getSectionEntriesFromPage('popular', page);
  const recipe = getSectionEntriesFromPage('recipe', page);
  const instagram = getSectionEntriesFromPage('instagram', page);

  return (
    <Layout
      data={universal}
      cart={cart}
      cartRemoveOneItemHandler={cartRemoveOneItemHandler}
      cartRemoveAllItemsHandler={cartRemoveAllItemsHandler}
    >
      <SEO title="Главная" />

      <BannerSection data={banner} />
      <CompanySection data={company} />
      <HowSection data={how} />
      <PopularSection
        data={popular}
        products={catalog}
        onClick={addToCartBtnHandler}
      />
      <RecipeSection data={recipe} recipes={posts} />
      <InstaSection data={instagram} />
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
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
  cartRemoveOneItemHandler: PropTypes.func.isRequired,
  cartRemoveAllItemsHandler: PropTypes.func.isRequired,
};

export default IndexPage;

export const query = graphql`
  query indexQuery {
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
          featuredImage {
            sourceUrl
            mediaItemId
            modified
            imageFile {
              childImageSharp {
                fluid(maxWidth: 386) {
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

// export const query = graphql`
//   query indexQuery {
//     wpgraphql {
//       posts {
//         nodes {
//           recipe_post {
//             recipeName
//             description
//             // ingredients
//             // preparation
//             // similar {
//             //   first
//             //   second
//             //   third
//             // }
//           }
//           // id
//           // postId
//           slug
//         }
//       }
//     }
//   }
// `;
