import React from 'react';

import Logo from '../Logo';
import Wrapper from '../Wrapper';

function Footer() {
  return (
    <footer className="Footer">
      {/* <Logo src={} isAlt={true} /> */}

      <Wrapper>
        <p className="Footer-info">КОРМИМ ПРАВИЛЬНО ©</p>
        <p className="Footer-info">
          <strong>ООО</strong>
          Дейли Мил
        </p>
        <p className="Footer-info">
          <strong>ИНН</strong>
          0278932180
        </p>
        <p className="Footer-info">
          <strong>ОРГН</strong>
          1170280046562
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

export default Footer;
