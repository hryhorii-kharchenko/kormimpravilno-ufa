import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo';
import Wrapper from '../Wrapper';

function Footer({ copyright, ooo, inn, orgn }) {
  return (
    <footer className="Footer">
      <Logo isAlt />

      <Wrapper>
        <p className="Footer-info">{copyright}</p>
        <p className="Footer-info">
          <strong>ООО</strong>
          {ooo}
        </p>
        <p className="Footer-info">
          <strong>ИНН</strong>
          {inn}
        </p>
        <p className="Footer-info">
          <strong>ОРГН</strong>
          {orgn}
        </p>
      </Wrapper>

      <p className="Footer-creator">
        Создание сайта -
        <a href="https://yevdokimov.pro" className="Footer-creator-link">
          Yevdokimov
        </a>
      </p>
    </footer>
  );
}

Footer.propTypes = {
  copyright: PropTypes.string.isRequired,
  ooo: PropTypes.string.isRequired,
  inn: PropTypes.string.isRequired,
  orgn: PropTypes.string.isRequired,
};

export default Footer;
