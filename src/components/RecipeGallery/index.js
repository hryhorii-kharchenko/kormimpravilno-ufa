import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import RecipeCard from '../RecipeCard';

import './RecipeGallery.module.css';

function RecipeGallery({ posts, recipes, isSlider, aimRecipeCount }) {
  const filtered = recipes.filter(elem => {
    return elem !== undefined;
  });

  if (filtered.length < aimRecipeCount) {
    const { length } = filtered;
    let position = 0;

    for (let i = 0; i < aimRecipeCount - length; i += 1) {
      while (posts.includes(filtered[position])) {
        position += 1;
      }
      if (posts[position]) {
        filtered.push(posts[position]);
      }
      position += 1;
    }
  }

  const gallery = filtered.map(recipe => {
    return (
      <div styleName="recipe-wrapper" key={recipe.id}>
        <RecipeCard
          avatar={recipe.featuredImageSmall.imageFile.childImageSharp.fluid}
          heading={recipe.recipe_post.recipeName}
          description={recipe.recipe_post.description}
          slug={recipe.slug}
        />
      </div>
    );
  });

  for (let i = 0; i < aimRecipeCount - gallery.length; i += 0) {
    gallery.push(gallery[0]);
  }

  if (!isSlider) {
    return <section styleName="RecipeGallery">{gallery}</section>;
  }

  if (isSlider && aimRecipeCount === 3) {
    let browserWidth = 1220;
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      responsive: [{ breakpoing: 586, settings: { centerMode: false } }],
    };

    if (typeof window !== `undefined`) {
      browserWidth = window.innerWidth;
    }

    if (browserWidth < 1254) {
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

    return <section styleName="RecipeGallery">{gallery}</section>;
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
  aimRecipeCount: 3,
};

RecipeGallery.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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
  aimRecipeCount: PropTypes.number,
};

export default RecipeGallery;
