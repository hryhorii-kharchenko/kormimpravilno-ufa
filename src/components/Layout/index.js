import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';

function Layout({ data, children }) {
  return (
    <>
      <Header phone={data.phone} instaLink={data.instaLink} />

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
  data: PropTypes.shape.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
