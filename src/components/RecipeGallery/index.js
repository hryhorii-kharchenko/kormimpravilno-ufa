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
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '50px',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            dots: false,
            centerPadding: '150px',
          },
        },
        {
          breakpoint: 815,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            dots: false,
            centerPadding: '60px',
          },
        },
        {
          breakpoint: 568,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            dots: false,
            centerPadding: '20px',
          },
        },
        {
          breakpoint: 490,
          settings: {
            slidesToShow: 1,
            centerMode: false,
            dots: false,
            centerPadding: '0px',
          },
        },
      ],
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
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      featuredImageSmall: PropTypes.shape({
        imageFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({ fluid: PropTypes.shape() }),
        }),
      }),
      recipe_post: PropTypes.shape({
        recipeName: PropTypes.string,
        description: PropTypes.string,
      }),
      slug: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      featuredImageSmall: PropTypes.shape({
        imageFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({ fluid: PropTypes.shape() }),
        }),
      }),
      recipe_post: PropTypes.shape({
        recipeName: PropTypes.string,
        description: PropTypes.string,
      }),
      slug: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  isSlider: PropTypes.bool,
  aimRecipeCount: PropTypes.number,
};

export default RecipeGallery;
