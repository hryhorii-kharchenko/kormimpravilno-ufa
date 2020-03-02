import React, { Component } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import AriaModal from 'react-aria-modal';
import fromEntries from 'object.fromentries';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import BannerSection from '../components/BannerSection';
import CompanySection from '../components/CompanySection';
import HowSection from '../components/HowSection';
import PopularSection from '../components/PopularSection';
import RecipeSection from '../components/RecipeSection';
import InstaSection from '../components/InstaSection';
import Button from '../components/Button';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    function gup(name, url) {
      if (!url) url = props.location.href;
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      const regexS = `[\\?&]${name}=([^&#]*)`;
      const regex = new RegExp(regexS);
      const results = regex.exec(url);
      return results == null ? null : results[1];
    }
    const getVar = gup('popup', props.location.href);

    const tempSuccess = getVar === 'success';
    const tempFail = getVar === 'fail';

    const saveCity = gup('saveCity', props.location.href);
    if (saveCity) {
      window.localStorage.setItem('saveCity', true);
    }

    if (typeof window !== 'undefined') {
      if (!window.localStorage.getItem('saveCity')) {
        props.openCityModal();
      }
    }

    this.state = {
      isSuccess: tempSuccess,
      isFail: tempFail,
    };

    this.setIsSuccess = this.setIsSuccess.bind(this);
    this.setIsFail = this.setIsFail.bind(this);
  }

  setIsSuccess(value) {
    this.setState({ isSuccess: value });
  }

  setIsFail(value) {
    this.setState({ isFail: value });
  }

  render() {
    const {
      data,
      catalog,
      cart,
      addToCartBtnHandler,
      cartRemoveOneStackHandler,
      cartRemoveWholeItemHandler,
      openCart,
      location,
    } = this.props;

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

    const page = data.wpgraphql.mainPage.main_page;
    const universal = data.wpgraphql.universalPage.universal_page;
    const posts = data.wpgraphql.posts.nodes;
    const instaNodes = data.allInstaNode.nodes;

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

    const successPopup = this.state.isSuccess ? (
      <AriaModal
        titleText="Удачная оплата"
        onExit={() => this.setIsSuccess(false)}
        getApplicationNode={() => {
          return document.getElementById('___gatsby');
        }}
        underlayStyle={{ background: 'rgba(0, 0, 0, 0.63)' }}
        verticallyCenter
        dialogStyle={{
          maxWidth: '857px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px 0px',
            borderRadius: '16px',
          }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '34px' }}>
            Оплата прошла успешно!
          </h2>
          <Button
            isAction
            isFilled
            style={{ width: '160px', margin: '0 auto' }}
            onClick={() => {
              this.setIsSuccess(false);
            }}
          >
            Закрыть
          </Button>
        </div>
      </AriaModal>
    ) : null;

    const failPopup = this.state.isFail ? (
      <AriaModal
        titleText="Неудачая оплата"
        onExit={() => this.setthis.setIsFail(false)}
        getApplicationNode={() => {
          return document.getElementById('___gatsby');
        }}
        underlayStyle={{ background: 'rgba(0, 0, 0, 0.63)' }}
        verticallyCenter
        dialogStyle={{
          maxWidth: '857px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px 0px',
            borderRadius: '16px',
          }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '34px' }}>
            Оплата завершилась неудачей.
          </h2>
          <Button
            isAction
            isFilled
            style={{ width: '160px', margin: '0 auto' }}
            onClick={() => {
              this.setIsFail(false);
            }}
          >
            Закрыть
          </Button>
        </div>
      </AriaModal>
    ) : null;

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
        <SEO title="Главная" />

        <BannerSection data={banner} bgImg={data.bannerBg} />
        <CompanySection data={company} />
        <HowSection data={how} />
        <PopularSection
          data={popular}
          products={catalog}
          onClick={addToCartBtnHandler}
          openCart={openCart}
          shopBtnText={banner.bannerBtnStore}
        />
        <RecipeSection data={recipe} recipes={posts} />
        <InstaSection data={instagram} instaNodes={instaNodes} />
        {successPopup}
        {failPopup}
      </Layout>
    );
  }
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
  openCart: PropTypes.func.isRequired,
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
    allInstaNode {
      nodes {
        featuredImg {
          childImageSharp {
            fixed(width: 288, height: 288) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        permalink
        position
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
          city
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
