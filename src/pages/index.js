import React, { Component } from 'react';
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

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: props.data.wpgraphql.mainPage.main_page,
      universal: props.data.wpgraphql.universalPage.universal_page,
      posts: props.data.wpgraphql.posts,
      products: props.data.wpgraphql.products,
      // cart: [{ id: 123, amount: 1 }],
    };

    this.recipeOnClickHandler = this.recipeOnClickHandler.bind(this);
    this.addNewItemToCart = this.addNewItemToCart.bind(this);
  }

  addNewItemToCart(id, amount) {
    // this.setState(state => {
    //   const index = state.cart.indexOf(item => item.id === id);

    //   if (index !== -1) {
    //     const newCart = [...state.cart];
    //     newCart[id].amount += amount;

    //     return {
    //       cart: newCart,
    //     };
    //   }

    //   return {
    //     cart: [...state.cart, { id, amount }],
    //   };
    // });
    return this.null + id + amount;
  }

  recipeOnClickHandler(id) {
    this.addNewItemToCart(id);
  }

  render() {
    function getSectionEntriesFromPage(sectionName, sourceObject) {
      return Object.fromEntries(
        Object.entries(sourceObject).filter(field =>
          field[0].includes(sectionName)
        )
      );
    }

    const { page, universal, posts, products } = this.state;

    const banner = getSectionEntriesFromPage('banner', page);
    const company = getSectionEntriesFromPage('company', page);
    const how = getSectionEntriesFromPage('how', page);
    const popular = getSectionEntriesFromPage('popular', page);
    const recipe = getSectionEntriesFromPage('recipe', page);
    const instagram = getSectionEntriesFromPage('instagram', page);

    return (
      <Layout data={universal}>
        <SEO title="Главная" />

        <BannerSection data={banner} />
        <CompanySection data={company} />
        <HowSection data={how} />
        <PopularSection
          data={popular}
          products={products}
          onClick={this.recipeOnClickHandler}
        />
        <RecipeSection data={recipe} recipes={posts} />
        <InstaSection data={instagram} />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    wpgraphql: PropTypes.shape({
      mainPage: PropTypes.shape({
        main_page: PropTypes.shape,
      }),
      universalPage: PropTypes.shape({
        universal_page: PropTypes.shape,
      }),
      posts: PropTypes.shape(),
      products: PropTypes.shape,
    }),
  }).isRequired,
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
          recipe_post {
            recipeName
            description
            // ingredients
            // preparation
            // similar {
            //   first
            //   second
            //   third
            // }
          }
          // id
          // postId
          slug
        }
      }
      products {
        nodes {
          product_post {
            productName
            composition
            weight
            // cooking
            // nutrition
            // similar {
            //   first
            //   second
            //   third
            // }
          }
          ... on SimpleProduct {
            price
            productId
            id
          }
        }
      }
    }
  }
`;
