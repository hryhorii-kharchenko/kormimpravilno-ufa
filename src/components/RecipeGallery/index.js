import React from 'react';
import PropTypes from 'prop-types';

import RecipeCard from '../RecipeCard';

function RecipeGallery({ recipes }) {
  const gallery = recipes.map(recipe => (
    <RecipeCard
      imgSrc={recipe.imgSrc}
      heading={recipe.heading}
      description={recipe.description}
      link={recipe.link}
    />
  ));

  return <section className="RecipeGallery">{gallery}</section>;
}

RecipeGallery.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      heading: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default RecipeGallery;
