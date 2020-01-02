import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import UnderlinedLink from '../UnderlinedLink';

import './RecipeCard.module.css';

function RecipeCard({ avatar, heading, description, slug }) {
  return (
    <article styleName="RecipeCard">
      <Link to={slug} styleName="link-wrapper">
        <Img fluid={avatar} alt={heading} styleName="avatar" />

        <div styleName="content-wrapper">
          <header styleName="header">
            <h3 styleName="heading">{heading}</h3>
            <p styleName="description">{description}</p>
          </header>

          <footer styleName="footer">
            <UnderlinedLink
              text="Перейти к рецепту"
              styleName="underlined-link"
            />
          </footer>
        </div>
      </Link>
    </article>
  );
}

RecipeCard.propTypes = {
  avatar: PropTypes.shape().isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default RecipeCard;
