import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './BoxedQuote.module.css';

function BoxedQuote({ text, btnText }) {
  return (
    <blockquote styleName="BoxedQuote">
      <p styleName="text">{text}</p>

      <Button isAction isWide isFilled styleName="button">
        {btnText}
      </Button>
    </blockquote>
  );
}

BoxedQuote.propTypes = {
  text: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};

export default BoxedQuote;
