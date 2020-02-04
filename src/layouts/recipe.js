import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SecondaryBanner from '../components/SecondaryBanner';
import MainRecipeSection from '../components/MainRecipeSection';
import SimilarRecipeSection from '../components/SimilarRecipeSection';

function RecipeLayout({
  pageContext,
  cart,
  // catalog,
  // addToCartBtnHandler,
  // cartRemoveOneStackHandler,
  // cartRemoveWholeItemHandler,
  openCart,
  location,
}) {
  const { id, posts, bannerBg, universal } = pageContext;
  const recipe = posts.find(prod => prod.id === id);
  const { featuredImageFull } = recipe;
  const { recipeName, ingredients, preparation, similar } = recipe.recipe_post;
  const avatar = featuredImageFull;

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
      <SEO title={recipeName} />
      <SecondaryBanner
        pageTitle={recipeName}
        pathname={location.pathname}
        fluid={bannerBg.childImageSharp.fluid}
      />
      <MainRecipeSection
        ingredients={ingredients}
        preparation={preparation}
        avatarFluid={avatar ? avatar.imageFile.childImageSharp.fluid : null}
      />
      <SimilarRecipeSection similar={similar} posts={posts} />
    </Layout>
  );
}

RecipeLayout.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string,
    recipe_post: PropTypes.shape({
      recipeName: PropTypes.string,
      ingredients: PropTypes.string,
      preparation: PropTypes.string,
    }),
    posts: PropTypes.arrayOf(PropTypes.shape()),
    featuredImage: PropTypes.shape({
      imageFile: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape(),
        }),
      }),
    }),
    bannerBg: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape(),
      }),
    }),
    universal: PropTypes.shape(),
  }).isRequired,
  // catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  // addToCartBtnHandler: PropTypes.func.isRequired,
  // cartRemoveOneStackHandler: PropTypes.func.isRequired,
  // cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default RecipeLayout;
