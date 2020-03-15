import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './CityModal.module.css';
import CrossIcon from '../../images/inline/cross.svg';

function CityModal({ close }) {
  return (
    <div styleName="CityModal">
      <h2 styleName="heading">Из какого вы города?</h2>
      <div styleName="line" />

      <p styleName="subheading">
        Магазин осуществляет доставку на территории Москвы, Уфы и
        Санкт-Петербурга.
      </p>

      <div styleName="link-wrapper">
        <Button
          href="https://msk.kormimpravilno.com/?saveCity=true"
          isExternal
          isTextBlack
          styleName="link"
        >
          Москва
        </Button>
        <Button
          href="https://kormimpravilno.com/?saveCity=true"
          isExternal
          isTextBlack
          styleName="link"
        >
          Уфа
        </Button>
        <Button
          href="https://spb.kormimpravilno.com/?saveCity=true"
          isExternal
          isTextBlack
          styleName="link"
        >
          C. Петербург
        </Button>
      </div>

      <button type="button" onClick={close} styleName="cross-btn">
        <CrossIcon styleName="cross-img" />
      </button>
    </div>
  );
}

CityModal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default CityModal;
