import React from 'react';
import PropTypes from 'prop-types';

import './BlockQuote.module.css';
import leafImg from '../../images/icons/leaf.svg';

function BlockQuote({ text, author }) {
  return (
    <blockquote styleName="BlockQuote">
      <p styleName="text">{text}</p>
      <footer styleName="footer">
        <div styleName="author-decoration" />
        <h3 styleName="author">{author}</h3>
      </footer>

      <img src={leafImg} alt="" styleName="decoration" />
    </blockquote>
  );
}

BlockQuote.defaultProps = {
  author: 'Kormim Pravilno',
};

BlockQuote.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string,
};

export default BlockQuote;
