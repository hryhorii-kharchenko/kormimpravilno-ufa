import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './BoxedQuote.module.css';
import quotesImg from '../../images/svg/quotes.svg';

function BoxedQuote({ text, btnText }) {
  return (
    <blockquote styleName="BoxedQuote">
      <p styleName="text">{text}</p>

      <div styleName="button-wrapper">
        <Button isAction isFilled styleName="button">
          {btnText}
        </Button>
      </div>

      <img src={quotesImg} alt="" styleName="decoration" />
    </blockquote>
  );
}

BoxedQuote.propTypes = {
  text: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};

export default BoxedQuote;
