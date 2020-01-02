import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo';
import Wrapper from '../Wrapper';

import './Footer.module.css';

function Footer({ copyright, ooo, inn, orgn }) {
  return (
    <>
      <div styleName="line" />
      <footer styleName="Footer">
        <Logo isAlt />

        <Wrapper styleName="wrapper">
          <p styleName="info">{copyright}</p>
          <p styleName="info">
            <strong>ООО </strong>
            {ooo}
          </p>
          <p styleName="info">
            <strong>ИНН </strong>
            {inn}
          </p>
          <p styleName="info">
            <strong>ОРГН </strong>
            {orgn}
          </p>
        </Wrapper>

        <p styleName="creator">
          Создание сайта -
          <a
            href="https://yevdokimov.pro"
            target="_blank"
            rel="noopener noreferrer"
            styleName="creator-link"
          >
            Yevdokimov
          </a>
        </p>
      </footer>
    </>
  );
}

Footer.propTypes = {
  copyright: PropTypes.string.isRequired,
  ooo: PropTypes.string.isRequired,
  inn: PropTypes.string.isRequired,
  orgn: PropTypes.string.isRequired,
};

export default Footer;
