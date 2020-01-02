import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';
import RecipeGallery from '../RecipeGallery';
import ContentWrapper from '../ContentWrapper';

import './SimilarRecipeSection.module.css';

function SimilarRecipeSection({ similar, posts }) {
  const recipes = [];

  recipes.push(posts.find(() => posts.postId === similar.first));
  recipes.push(posts.find(() => posts.postId === similar.second));
  recipes.push(posts.find(() => posts.postId === similar.third));

  return (
    <section styleName="SimilarRecipeSection" id="recipes">
      <ContentWrapper>
        <SectionHeading text="Рецепты" isBig />
        <SectionSubheading
          text="Фирменные способы приготовления блюд с полуфабрикатами «Кормим Правильно»"
          styleName="subheading"
        />

        <RecipeGallery posts={posts} recipes={recipes} />
      </ContentWrapper>
    </section>
  );
}

SimilarRecipeSection.propTypes = {
  similar: PropTypes.shape({
    first: PropTypes.string,
    second: PropTypes.string,
    third: PropTypes.string,
  }).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SimilarRecipeSection;
