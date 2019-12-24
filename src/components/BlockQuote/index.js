import React from 'react';
import PropTypes from 'prop-types';

import './BlockQuote.module.css';
import leafImg from '../../images/svg/leaf.svg';

function BlockQuote({ text }) {
  return (
    <blockquote styleName="BlockQuote">
      <p styleName="text">{text}</p>
      <footer styleName="footer">
        <div styleName="author-decoration" />
        <h3 styleName="author">Kormim Pravilno</h3>
      </footer>

      <img src={leafImg} alt="" styleName="decoration" />
    </blockquote>
  );
}

BlockQuote.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BlockQuote;
