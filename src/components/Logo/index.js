import React from 'react';
import { Link } from 'gatsby';
// import { Link, useStaticQuery, graphql } from 'gatsby';
// import Img from 'gatsby-image';
import PropTypes from 'prop-types';

import './Logo.module.css';
import logoSvg from '../../images/svg/logo.svg';

function Logo({ isAlt }) {
  const styleName = isAlt ? 'Logo-alt' : 'Logo';
  // const data = useStaticQuery(graphql`
  //   query {
  //     logo: file(relativePath: { eq: "logo.jpg" }) {
  //       childImageSharp {
  //         fixed(width: 235, height: 26) {
  //           ...GatsbyImageSharpFixed_withWebp
  //         }
  //       }
  //     }
  //     logoAlt: file(relativePath: { eq: "logo-alt.jpg" }) {
  //       childImageSharp {
  //         fixed(width: 102, height: 47) {
  //           ...GatsbyImageSharpFixed_withWebp
  //         }
  //       }
  //     }
  //   }
  // `);

  return (
    <Link to="/" styleName={styleName}>
      <img src={logoSvg} alt="Логотип" styleName="logo-img" />
      {/* <Img
        fixed={
          isAlt
            ? data.logoAlt.childImageSharp.fixed
            : data.logo.childImageSharp.fixed
        }
        alt="Кормим правильно"
      /> */}
    </Link>
  );
}

Logo.propTypes = {
  isAlt: PropTypes.bool,
};

Logo.defaultProps = {
  isAlt: false,
};

export default Logo;
