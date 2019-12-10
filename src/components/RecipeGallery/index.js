import React from 'react';
import PropTypes from 'prop-types';

import RecipeCard from '../RecipeCard';

function RecipeGallery({ recipes }) {
  const gallery = recipes.map(recipe => (
    <RecipeCard
      avatar={recipe.featuredImage.imageFile.childImageSharp.fluid}
      heading={recipe.recipe_post.recipeName}
      description={recipe.recipe_post.description}
      link={recipe.slug}
      key={recipe.id}
      // id={recipe.id}
    />
  ));

  return <section className="RecipeGallery">{gallery}</section>;
}

RecipeGallery.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.shape,
      heading: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
};

export default RecipeGallery;
