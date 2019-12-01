import React from 'react';
import PropTypes from 'prop-types';

function BlockQuote({ text }) {
  return (
    <blockquote className="BlockQuote">
      <p className="BlockQuote-text">{text}</p>
      <footer className="BlockQuote-footer">
        <h3 className="BlockQuote-author">Kormim Pravilno</h3>
      </footer>
    </blockquote>
  );
}

BlockQuote.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BlockQuote;
