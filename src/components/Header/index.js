import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Headroom from 'react-headroom';
import AriaModal from 'react-aria-modal';

import Menu from '../Menu';
import Logo from '../Logo';
import Wrapper from '../Wrapper';
import CityPicker from '../CityPicker';
import Button from '../Button';

import './Header.module.css';
import InstaIcon from '../../images/inline/insta.svg';
import CartIcon from '../../images/inline/cart.svg';
import CrossIcon from '../../images/inline/cross.svg';

function Header({
  phone,
  instaLink,
  cart,
  // catalog,
  // addToCartBtnHandler,
  // cartRemoveOneStackHandler,
  // cartRemoveWholeItemHandler,
  openCart,
}) {
  const cartLength = Object.values(cart).reduce((prev, curr) => prev + curr, 0);
  const cardCounterHtml =
    cartLength > 0 ? <p styleName="cart-counter">{cartLength}</p> : null;

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isPickerActive, setIsPickerActive] = useState(false);

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
    { value: '/peterburg', label: 'Петербург' },
  ];

  const mobileMenuInitialFocusId = 'initial-focus-menu-modal';
  const mobileMenuModal = isMobileMenuActive ? (
    <AriaModal
      titleText="Меню"
      onExit={() => setIsMobileMenuActive(false)}
      initialFocus={`#${mobileMenuInitialFocusId}`}
      getApplicationNode={() => {
        return document.getElementById('___gatsby');
      }}
      underlayStyle={{ background: 'rgba(0, 0, 0, 0.63)' }}
      verticallyCenter
    >
      <div id="mobile-menu-modal" styleName="mobile-menu-modal">
        <Menu items={menuItems} firstItemId={mobileMenuInitialFocusId} />
        <CityPicker
          links={cityOptions}
          current="Москва"
          isPickerActive={isPickerActive}
          setIsPickerActive={setIsPickerActive}
        />
        <Button
          href={`tel:${phone}`}
          isTextBlack
          isExternal
          styleName="phone-btn"
        >
          {phone}
        </Button>

        <div styleName="mobile-menu-btn-wrapper">
          <Button href={instaLink} target="_blank" isCircle isExternal>
            <InstaIcon styleName="insta-img" />
          </Button>
          <Button onClick={openCart} isCircle isAction styleName="cart-btn">
            <div styleName="cart-icon-wrapper">
              <CartIcon styleName="cart-img" />
            </div>
            {cardCounterHtml}
          </Button>
        </div>
      </div>
    </AriaModal>
  ) : null;

  const burgerContentHtml = isMobileMenuActive ? (
    <CrossIcon styleName="cross-img" />
  ) : (
    <>
      <div styleName="burger-line" />
      <div styleName="burger-line" />
      <div styleName="burger-line" />
    </>
  );

  let browserWidth = 1200;

  if (typeof window !== 'undefined') {
    browserWidth = window.innerWidth;
  }

  if (browserWidth > 1220) {
    return (
      <Headroom style={{ zIndex: 100 }}>
        <header styleName="Header">
          <Menu items={menuItems} />

          <Logo />

          <Wrapper justifyContent="flex-end" styleName="Wrapper">
            <CityPicker
              links={cityOptions}
              current="Москва"
              isPickerActive={isPickerActive}
              setIsPickerActive={setIsPickerActive}
            />

            <Button
              href={`tel:${phone}`}
              isTextBlack
              isExternal
              styleName="phone-btn"
            >
              {phone}
            </Button>

            <Button href={instaLink} target="_blank" isCircle isExternal>
              <InstaIcon styleName="insta-img" />
            </Button>

            <Button onClick={openCart} isCircle isAction styleName="cart-btn">
              <div styleName="cart-icon-wrapper">
                <CartIcon styleName="cart-img" />
              </div>
              {cardCounterHtml}
            </Button>
          </Wrapper>
        </header>
      </Headroom>
    );
  }

  return (
    <Headroom style={{ zIndex: 100 }}>
      <header styleName="Header">
        <Logo />

        <button
          type="button"
          onClick={() => setIsMobileMenuActive(true)}
          styleName="burger-btn"
        >
          {burgerContentHtml}
        </button>
      </header>
      {mobileMenuModal}
    </Headroom>
  );
}

Header.defaultProps = {
  phone: '8 (800) 775 09 20',
  instaLink: 'https://www.instagram.com/kormim_pravilno/',
};

Header.propTypes = {
  phone: PropTypes.string,
  instaLink: PropTypes.string,
  // catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  // addToCartBtnHandler: PropTypes.func.isRequired,
  // cartRemoveOneStackHandler: PropTypes.func.isRequired,
  // cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
};

export default Header;
