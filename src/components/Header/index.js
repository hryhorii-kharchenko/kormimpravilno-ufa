import React from 'react';
import PropTypes from 'prop-types';

import Headroom from 'react-headroom';

import Menu from '../Menu';
import Logo from '../Logo';
import Wrapper from '../Wrapper';
import CityPicker from '../CityPicker';
import Button from '../Button';

import './Header.module.css';
import instaIcon from '../../images/svg/insta.svg';
import cartIcon from '../../images/svg/cart.svg';

function Header({ phone, instaLink }) {
  const menuItems = [
    { title: 'Главная', url: '/' },
    { title: 'Магазин', url: '/shop' },
    { title: 'Доставка и оплата', url: '/delivery' },
    { title: 'О нас', url: '/about' },
  ];
  const cityOptions = [
    { value: '/moscow', label: 'Москва' },
    { value: '/kazan', label: 'Казань' },
    { value: '/ekaterinburg', label: 'Екатеринбург' },
    { value: '/peterburg', label: 'Санкт-Петербург' },
  ];

  return (
    <Headroom style={{ zIndex: 100 }}>
      <header styleName="header">
        <Menu items={menuItems} />

        <Logo />

        <Wrapper justifyContent="flex-end" styleName="Wrapper">
          <CityPicker options={cityOptions} current="Москва" />

          <Button
            href={`tel:${phone}`}
            isTextBlack
            isExternal
            styleName="phone-btn"
          >
            {phone}
          </Button>

          <Button href={instaLink} target="_blank" isCircle isExternal>
            <img styleName="insta-img" src={instaIcon} alt="Instagram" />
          </Button>

          <Button onClick={() => alert(1)} isCircle isAction>
            <img styleName="cart-img" src={cartIcon} alt="Корзина" />
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
