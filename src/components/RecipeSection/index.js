import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';
import RecipeGallery from '../RecipeGallery';
import ContentWrapper from '../ContentWrapper';

import './RecipeSection.module.css';

function RecipeSection({ data, recipes }) {
  return (
    <section styleName="RecipeSection" id="recipes">
      <ContentWrapper>
        <SectionHeading text={data.recipesHeading} isBig />
        <SectionSubheading text={data.recipesSubheading} />

        <RecipeGallery posts={recipes} recipes={recipes} isSlider />
      </ContentWrapper>
    </section>
  );
}

RecipeSection.propTypes = {
  data: PropTypes.shape({
    recipesHeading: PropTypes.string.isRequired,
    recipesSubheading: PropTypes.string.isRequired,
  }).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RecipeSection;
