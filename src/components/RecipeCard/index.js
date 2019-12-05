import React from 'react';
import PropTypes from 'prop-types';

import UnderlinedLink from '../UnderlinedLink';

function RecipeCard({ imgSrc, heading, description, link }) {
  return (
    <article className="RecipeCard">
      <img src={imgSrc} alt={heading} className="RecipeCard-avatar" />

      <header className="RecipeCard-header">
        <h3 className="RecipeCard-heading">{heading}</h3>
        <p className="RecipeCard-description">{description}</p>
      </header>

      <footer className="RecipeCard-footer">
        <UnderlinedLink text="Перейти к рецепту" href={link} />
      </footer>
    </article>
  );
}

RecipeCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
};

export default RecipeCard;
