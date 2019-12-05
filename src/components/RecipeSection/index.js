import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';
import RecipeGallery from '../RecipeGallery';

function RecipeSection({ data, recipes }) {
  return (
    <section className="RecipeSection" id="recipes">
      <SectionHeading text={data.recipesHeading} />
      <SectionSubheading text={data.recipesSubheading} />

      <RecipeGallery recipes={recipes} />
    </section>
  );
}

RecipeSection.propTypes = {
  data: PropTypes.shape({
    recipesHeading: PropTypes.string.isRequired,
    recipesSubheading: PropTypes.string.isRequired,
  }).isRequired,
  recipes: PropTypes.shape.isRequired,
};

export default RecipeSection;
