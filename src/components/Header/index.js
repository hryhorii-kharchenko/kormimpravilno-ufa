import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Headroom from 'react-headroom';
import AriaModal from 'react-aria-modal';

import Menu from '../Menu';
import Logo from '../Logo';
import Wrapper from '../Wrapper';
import CityPicker from '../CityPicker';
import Button from '../Button';
import Cart from '../Cart';

import './Header.module.css';
import InstaIcon from '../../images/inline/insta.svg';
import CartIcon from '../../images/inline/cart.svg';
import CrossIcon from '../../images/inline/cross.svg';

function Header({
  phone,
  instaLink,
  cart,
  catalog,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
}) {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);
  const closeCart = () => setIsCartActive(false);

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
        <CityPicker options={cityOptions} current="Москва" />
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
          <Button onClick={() => setIsCartActive(true)} isCircle isAction>
            <CartIcon styleName="cart-img" />
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

  const cartModal = isCartActive ? (
    <AriaModal
      titleText="Корзина"
      onExit={() => setIsMobileMenuActive(false)}
      getApplicationNode={() => {
        return document.getElementById('___gatsby');
      }}
      underlayStyle={{ background: 'rgba(0, 0, 0, 0.63)' }}
      verticallyCenter
      dialogStyle={{
        maxWidth: '857px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div id="cart-modal" styleName="cart-modal">
        <Cart
          closeCart={closeCart}
          cart={cart}
          catalog={catalog}
          addToCartBtnHandler={addToCartBtnHandler}
          cartRemoveOneStackHandler={cartRemoveOneStackHandler}
          cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
        />
      </div>
    </AriaModal>
  ) : null;

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
              <InstaIcon styleName="insta-img" />
            </Button>

            <Button onClick={() => setIsCartActive(true)} isCircle isAction>
              <CartIcon styleName="cart-img" />
            </Button>
          </Wrapper>
        </header>
        {cartModal}
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
      {cartModal}
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
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
};

export default Header;
