import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

import UnderlinedLink from '../UnderlinedLink';

import './RecipeCard.module.css';

function RecipeCard({ avatar, heading, description, link }) {
  return (
    <article styleName="RecipeCard">
      <Img fluid={avatar} alt={heading} styleName="avatar" />

      <div styleName="content-wrapper">
        <header styleName="header">
          <h3 styleName="heading">{heading}</h3>
          <p styleName="description">{description}</p>
        </header>

        <footer styleName="footer">
          <UnderlinedLink text="Перейти к рецепту" href={link} />
        </footer>
      </div>
    </article>
  );
}

RecipeCard.propTypes = {
  avatar: PropTypes.shape().isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
};

export default RecipeCard;
