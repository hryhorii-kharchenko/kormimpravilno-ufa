import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

function BoxedQuote({ text, btnText }) {
  return (
    <blockquote className="BoxedQuote">
      <p className="BoxedQuote-text">{text}</p>

      <Button isAction isWide isFilled parentClasses="BoxedQuote-button">
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
