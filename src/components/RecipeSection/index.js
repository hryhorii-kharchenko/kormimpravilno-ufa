import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';

function RecipeSection({ data }) {
  return (
    <section className="RecipeSection">
      <SectionHeading text={data.recipesHeading} />
      <SectionSubheading text={data.recipesSubheading} />

      {/* <RecipeGallery recipes={} /> */}
    </section>
  );
}

RecipeSection.propTypes = {
  data: PropTypes.shape({
    recipesHeading: PropTypes.string.isRequired,
    recipesSubheading: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeSection;
