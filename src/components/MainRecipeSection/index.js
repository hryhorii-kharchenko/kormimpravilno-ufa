import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import ContentWrapper from '../ContentWrapper';
import SanitizeHTML from '../SanitizeHTML';

import './MainRecipeSection.module.css';

function MainRecipeSection({ ingredients, preparation, avatarFluid }) {
  return (
    <section styleName="MainRecipeSection" id="main">
      <ContentWrapper>
        <div styleName="ingredients-wrapper">
          <h2 styleName="heading">Ингредиенты:</h2>
          <div styleName="text-wrapper">
            <SanitizeHTML html={ingredients} />
          </div>
        </div>
        <div styleName="preparation-wrapper">
          <h2 styleName="heading">Приготовление:</h2>
          <div styleName="text-wrapper">
            <SanitizeHTML html={preparation} />
          </div>
        </div>
        <div styleName="img-wrapper">
          <Img fluid={avatarFluid} styleName="image" />
        </div>
      </ContentWrapper>
    </section>
  );
}

MainRecipeSection.propTypes = {
  ingredients: PropTypes.string.isRequired,
  preparation: PropTypes.string.isRequired,
  avatarFluid: PropTypes.shape().isRequired,
};

export default MainRecipeSection;
