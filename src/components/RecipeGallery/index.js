import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import RecipeCard from '../RecipeCard';

import './RecipeGallery.module.css';

function RecipeGallery({ recipes, isSlider }) {
  const gallery = recipes.map(recipe => {
    if (!isSlider) {
      return (
        <RecipeCard
          avatar={recipe.featuredImage.imageFile.childImageSharp.fluid}
          heading={recipe.recipe_post.recipeName}
          description={recipe.recipe_post.description}
          link={recipe.slug}
          key={recipe.id}
          // id={recipe.id}
        />
      );
    }

    return (
      <div styleName="recipe-wrapper" key={recipe.id}>
        <RecipeCard
          avatar={recipe.featuredImage.imageFile.childImageSharp.fluid}
          heading={recipe.recipe_post.recipeName}
          description={recipe.recipe_post.description}
          link={recipe.slug}
          // id={recipe.id}
        />
      </div>
    );
  });

  if (!isSlider) {
    return <section styleName="RecipeGallery">{gallery}</section>;
  }

  if (gallery.length === 1) {
    gallery.push(...gallery, ...gallery);
  }

  if (gallery.length === 2) {
    gallery.push(gallery[0]);
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...settings}
      styleName="Slider"
    >
      {gallery}
    </Slider>
  );
}

RecipeGallery.defaultProps = {
  isSlider: false,
};

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
  isSlider: PropTypes.bool,
};

export default RecipeGallery;
