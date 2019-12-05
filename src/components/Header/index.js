import React from 'react';
import PropTypes from 'prop-types';

import Headroom from 'react-headroom';

import Menu from '../Menu';
import Logo from '../Logo';
import Wrapper from '../Wrapper';
import CityPicker from '../CityPicker';
import Button from '../Button';

function Header({ phone, instaLink }) {
  const menuItems = [
    { title: 'Главная', url: '/' },
    { title: 'Магазин', url: 'shop' },
    { title: 'Доставка и оплата', url: 'delivery' },
    { title: 'О нас', url: 'about' },
  ];
  const cities = ['Москва', 'Казань', 'Екатеринбург', 'Санкт-Петербург'];

  return (
    <Headroom>
      <header>
        <Menu items={menuItems} />

        <Logo />

        <Wrapper>
          <CityPicker cities={cities} />

          <Button href={`tel:${phone}`} isTextBlack isExternal>
            {phone}
          </Button>

          <Button href={instaLink} target="_blank" isCircle isExternal>
            <img className="InstaBtn-icon" src={iconUrl} alt="Instagram" />
          </Button>
        </Wrapper>
      </header>
    </Headroom>
  );
}

Header.propTypes = {
  phone: PropTypes.string,
  instaLink: PropTypes.string,
};

Header.defaultProps = {
  phone: '8 (800) 775 09 20',
  instaLink: 'https://www.instagram.com/kormim_pravilno/',
};

export default Header;
