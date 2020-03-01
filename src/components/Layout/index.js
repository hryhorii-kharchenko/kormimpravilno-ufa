import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';

function Layout({
  data,
  children,
  cart,
  // catalog,
  // addToCartBtnHandler,
  // cartRemoveOneStackHandler,
  // cartRemoveWholeItemHandler,
  openCart,
}) {
  return (
    <>
      <Header
        phone={data.phone}
        instaLink={data.instaLink}
        cart={cart}
        // catalog={catalog}
        // addToCartBtnHandler={addToCartBtnHandler}
        // cartRemoveOneStackHandler={cartRemoveOneStackHandler}
        // cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
        openCart={openCart}
        city={data.city}
      />

      <main>{children}</main>

      <Footer
        copyright={data.copyright}
        ooo={data.ooo}
        inn={data.inn}
        orgn={data.orgn}
      />
    </>
  );
}

Layout.propTypes = {
  data: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
  // catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  // addToCartBtnHandler: PropTypes.func.isRequired,
  // cartRemoveOneStackHandler: PropTypes.func.isRequired,
  // cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
};

export default Layout;
